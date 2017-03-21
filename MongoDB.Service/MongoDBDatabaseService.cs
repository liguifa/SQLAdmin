using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using MMS.MongoDB;
using MongoDB.Dao;
using SQLAdmin.Dao;
using MSQLAdmin.Domain;

namespace MongoDB.Service
{
    public class MongoDBDatabaseService : DBService, IDatabaseService
    {
        public MongoDBDatabaseService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public DatabaseTree GetDatabases()
        {
            try
            {
                using (var scope = new MongoDBContextScope(this.mDBConnect))
                {
                    IRepertory db = new MognoDBRepertory();
                    return db.GetDatabases().ToList().To<DatabaseTree>();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get databases,error:{e.ToString()}");
                throw;
            }
        }
    }
}
