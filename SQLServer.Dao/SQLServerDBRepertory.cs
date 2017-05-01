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
using static SQLServer.Utility.Constant;

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
            string sql = new SQLQuery();
        }

        public DataTable Filter(DataFilter filter)
        {
            string sql = new SQLQuery().Select("*").From(filter.TableName).OrderBy(filter.SortColumn, filter.IsAsc).Qenerate();
            return this.DBContext.SqlReader(sql);
        }

        public List<Database> GetDatabases()
        {
            //string sql = "SELECT * FROM Master..SysDatabases ORDER BY crdate";
            string sql = new SQLQuery().Select("*").From("Master..SysDatabases").OrderBy("crdate").Qenerate();
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
            string sql = new SQLQuery().Select("*").From($"{dbName}..SysObjects").OrderBy("Name").Qenerate();
            var dataTable = this.DBContext.SqlReader(sql);
            List<Table> tables = new List<Table>();
            return dataTable.ToList(row =>
            {
                return new Table()
                {
                    Id = row["id"].ToString(),
                    Name = row["name"].ToString(),
                };
            });
        }
    }
}
