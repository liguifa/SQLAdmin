using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Dao
{
    public class SQLServerDBContext : DBContext
    {
        private readonly string mConnString = String.Empty;

        private SqlConnection mSQLConnection
        {
            get
            {
                SqlConnection conn = new SqlConnection(this.mConnString);
                conn.Open();
                return conn;
            }
        }

        public SQLServerDBContext(string connString)
        {
            this.mConnString = connString;
        }

        public bool Connect()
        {
            try
            {
                var conn = this.mSQLConnection;
                return true;
            }
            catch(Exception e)
            {
                
            }
            return false;
        }

       
    }
}
