using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using SQLAdmin.Domain;
using SQLAdmin.Dao;
using MMS.MongoDB;
using MongoDB.Dao;
using Common.Logger;
using System.Reflection;

namespace MongoDB.Service
{
    public class MongoDBConnectService : IDBConnectService
    {
        private readonly static Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        public bool Connect()
        {
            throw new NotImplementedException();
        }

        public bool Connect(DBConnect connectSetting)
        {
            try
            {
                using (var scope = new MongoDBContextScope(connectSetting))
                {
                    IRepertory db = new MognoDBRepertory();
                    db.GetDatabases().ToList();
                }
                return true;
            }
            catch (Exception e)
            {
                mLog.Warn($"An error has occurred in the connect mongodb,error:{e.ToString()}");
            }
            return false;
        }
    }
}
