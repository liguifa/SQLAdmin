using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Dao
{
    public class SQLServerDBContextScope : DBContextScope
    {
        public SQLServerDBContextScope(SQLAdmin.Domain.DBConnect dbConnect) : base(dbConnect)
        {
        }

        protected override void Initialize(SQLAdmin.Domain.DBConnect dbConnect)
        {
            string connectStr = $"Data Source={dbConnect.Address};Initial Catalog=master;User Id={dbConnect.Userename};Password={dbConnect.Password};";
            DBContext = new SQLServerDBContext(connectStr);
        }


    }
}
