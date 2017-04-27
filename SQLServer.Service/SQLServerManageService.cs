using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using SQLServer.Dao;
using SQLAdmin.Utility;
using SQLServer.Utility;

namespace SQLServer.Service
{
    public class SQLServerManageService : DBService, IDBManageService
    {
        public SQLServerManageService(DBConnect dbConnect):base(dbConnect)
        {

        }

        [DBScopeInterecpor]
        public List<List<string>> Select(DataFilter filter)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.Filter(filter).To();
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the select data,error:{e.ToString()}");
                throw;
            }
        }
    }
}
