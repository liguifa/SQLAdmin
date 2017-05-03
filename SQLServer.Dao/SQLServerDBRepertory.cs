using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using System.Data.SqlClient;
using System.Data;
using SQLServer.Utility;

namespace SQLServer.Dao
{
    public class SQLServerDBRepertory : IRepertory
    {
        protected SQLServerDBContext DBContext
        {
            get
            {
                return SQLServerDBContextScope.DBContext as SQLServerDBContext;
            }
        }

        public bool Connect()
        {
            using (var conn = this.DBContext.GetConnect())
            {
                return conn != null;
            }
        }

        public bool CreateTable(Table table)
        {
            string sql = new SQLQuery().Create(table.Name).Table().Qenerate();
            var result = this.DBContext.AccessQuery(sql);
            return result > 0;
        }

        public DataTable Filter(DataFilter filter)
        {
            string sql = new SQLQuery().Select("*").From(filter.TableName).OrderBy(filter.SortColumn, filter.IsAsc).Skip((filter.PageIndex - 1) * filter.PageSize).Take(filter.PageSize).Qenerate();
            return this.DBContext.SqlReader(sql);
        }

        public List<Database> GetDatabases()
        {
            //string sql = "SELECT * FROM Master..SysDatabases ORDER BY crdate";
            string sql = new SQLQuery().Select("*").From("Master..SysDatabases").OrderBy("crdate", true).Qenerate();
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
           {
               return new Database()
               {
                   Id = Guid.NewGuid(), //row["dbid"].ToString(),
                   Name = row["name"].ToString()
               };
           });
        }

        public List<FieldType> GetFieldTypes()
        {
            // SELECT* FROM sys.types
            string sql = new SQLQuery().Select("*").From("sys.types").OrderBy("name").Qenerate();
            var types = this.DBContext.SqlReader(sql);
            return types.ToList(row =>
            {
                return new FieldType()
                {
                    DisplayName = row["name"].ToString(),
                    IsNullable = Convert.ToInt32(row["is_nullable"]),
                    MaxLength = Convert.ToInt32(row["max_length"])
                };
            });
        }

        public List<Table> GetTables(string dbName)
        {
            //string sql = $"SELECT * FROM {dbName}..SysObjects Where XType='U' ORDER BY Name";
            string sql = new SQLQuery().Select("*").From($"{dbName}..SysObjects").Where("type='U'").OrderBy("Name", true).Qenerate();
            var dataTable = this.DBContext.SqlReader(sql);
            List<Table> tables = new List<Table>();
            return dataTable.ToList(row =>
            {
                return new Table()
                {
                    Id = row["id"].ToString(),
                    Name = row["name"].ToString(),
                    Fullname = $"[{dbName}].[dbo].[{row["name"].ToString()}]"
                };
            });
        }

        public List<Field> GetTableFields(string tableName)
        {
            //select * from RP_DB..SysColumns where id = (select id from RP_DB..sysobjects where Name = 'SLA_SubmissionForm')
            //string sql = new SQLQuery().Select("*").From("SysColumns").wher
            var dbName = tableName.Split('.').First();
            var tbName = tableName.Split('.').Last().Remove(0, 1);
            tbName = tbName.Remove(tbName.Length - 1, 1);
            string sql = $"select * from {dbName}..SysColumns where id = (select id from {dbName}..sysobjects where Name = '{tbName}')";
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
            {
                return new Field()
                {
                    Id = row["id"].ToString(),
                    Name = row["name"].ToString()
                };
            });
        }

        public int Count(string tableName)
        {
            string sql = new SQLQuery().Count().From(tableName).Qenerate();
            return Convert.ToInt32(this.DBContext.SqlScaler(sql));
        }

        public bool Remove(RemoveFilter filter)
        {
            string sql = new SQLQuery().Delete(filter.TableName).Where($"ID in ('{String.Join("','", filter.Selected.ToArray())}')").Qenerate();
            return this.DBContext.AccessQuery(sql) > 0;
        }
    }
}
