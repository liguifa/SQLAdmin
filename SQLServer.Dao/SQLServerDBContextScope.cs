using Common.Interceptor;
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

        protected override DBContext Initialize(SQLAdmin.Domain.DBConnect dbConnect)
        {
            string connectStr = $"Data Source={dbConnect.Address};Initial Catalog=master;User Id={dbConnect.Userename};Password={dbConnect.Password};";
            return InterceptorFactory.GetInstance<SQLServerDBContext>(new SQLServerDBContext(connectStr));
        }


    }
}
