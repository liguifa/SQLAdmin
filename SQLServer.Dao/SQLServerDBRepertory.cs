using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;

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
            return this.DBContext.Connect();
        }

        public List<Database> GetDatabases()
        {
            throw new NotImplementedException();
        }

        public List<Table> GetTabses(string dbName)
        {
            throw new NotImplementedException();
        }
    }
}
