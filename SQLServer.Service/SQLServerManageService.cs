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
using SQLAdmin.Utility.ViewModels;

namespace SQLServer.Service
{
    public class SQLServerManageService : DBService, IDBManageService
    {
        public SQLServerManageService(DBConnect dbConnect):base(dbConnect)
        {

        }

        public bool Delete(RemoveFilter filter)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return true;
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the delete,error:{e.ToString()}");
                throw;
            }
        }

        [DBScopeInterecpor]
        public TableDataViewMdoel Select(DataFilter filter)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    //SQLServerDBRepertory db = new SQLServerDBRepertory();
                    //var count = db.Count(filter.TableName);
                    //var datas = db.Filter(filter).To();
                    //return new TableDataViewMdoel()
                    //{
                    //    Datas = datas,
                    //    PageIndex = filter.PageIndex,
                    //    PageSize = filter.PageSize,
                    //    PageCount = Convert.ToInt64(Math.Ceiling(((double)count / filter.PageSize))),
                    //    Total = count
                    //};
                    return new TableDataViewMdoel();
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
