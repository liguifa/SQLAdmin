using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using Common.Logger;
using System.Reflection;
using SQLServer.Dao;
using SQLAdmin.Dao;

namespace SQLServer.Service
{
    public class SQLServerConnectService :DBService, IDBConnectService
    {
        private readonly static Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        public SQLServerConnectService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public bool Connect()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.Connect();
                }
            }
            catch (Exception e)
            {
                mLog.Warn($"An error has occurred in the connect mongodb,error:{e.ToString()}");
            }
            return false;
        }
    }
}
