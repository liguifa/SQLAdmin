using Common.Logger;
using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Dao
{
    public class SQLServerDBContext : DBContext
    {
        private readonly string mConnString = String.Empty;
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

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

        public SqlConnection GetConnect()
        {
            try
            {
                return this.mSQLConnection;
            }
            catch(Exception e)
            {
                
            }
            return null;
        }


        #region public DataTable SqlReader(string sql)+Access数据库查询
        /// <summary>
        /// Access数据库查询
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public DataTable SqlReader(string sql)
        {
            mLog.Error($"Start exec sql:{sql}");
            using (SqlConnection conn = this.GetConnect())
            {
                SqlDataAdapter da = new SqlDataAdapter(sql, conn);
                DataSet ds = new DataSet();
                da.Fill(ds, "table");
                var res = ds.Tables["table"];
                conn.Close();
                return res;
            }
        }
        #endregion

        #region public int SqlQuery(string sql)+Access数据库的增、删、改.返回受影响行数
        /// <summary>
        /// Access数据库的增、删、改.返回受影响行数
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public int AccessQuery(string sql)
        {
            using (SqlConnection conn = this.GetConnect())
            {
                //conn.Open();
                SqlCommand oc = new SqlCommand(sql, conn);
                int result = oc.ExecuteNonQuery();
                conn.Close();
                return result;
            }
        }
        #endregion

        #region public object SqlScaler(string sql)+ Access数据库的增、删、改.返回结果集第一行第一列的值
        /// <summary>
        ///  Access数据库的增、删、改.返回结果集第一行第一列的值
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public object SqlScaler(string sql)
        {
            using (SqlConnection conn = this.GetConnect())
            {
                //conn.Open();
                SqlCommand oc = new SqlCommand(sql, conn);
                object result = oc.ExecuteScalar();
                conn.Close();
                return result;
            }
        }
        #endregion
    }
}
