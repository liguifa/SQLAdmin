using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using System.Data.SqlClient;
using System.Data;

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
            List<Database> databases = new List<Database>();
            foreach(DataRow row in dataTable.Rows)
            {
                Database database = new Database()
                {
                    Id = Guid.NewGuid(), //row["dbid"].ToString(),
                    Name = row["name"].ToString()
                };
                databases.Add(database);
            }
            return databases;
        }

        public List<Table> GetTables(string dbName)
        {
            //string sql = $"SELECT * FROM {dbName}..SysObjects Where XType='U' ORDER BY Name";
            string sql = new SQLQuery().Select("*").From($"{dbName}..SysObjects").OrderBy("Name").Qenerate();
            var dataTable = this.DBContext.SqlReader(sql);
            List<Table> tables = new List<Table>();
            foreach(DataRow row in dataTable.Rows)
            {
                Table table = new Table()
                {
                    Id = row["id"].ToString(),
                    Name = row["name"].ToString(),
                };
                tables.Add(table);
            }
            return tables;
        }
    }
}
