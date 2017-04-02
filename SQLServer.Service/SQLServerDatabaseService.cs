using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using SQLServer.Dao;
using SQLAdmin.Utility;

namespace SQLServer.Service
{
    public class SQLServerDatabaseService : DBService, IDatabaseService
    {
        public SQLServerDatabaseService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public DatabaseTree GetDatabases()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(new DBConnect() { Address = ".", Userename = "sa", Password = "123456" }))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
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
