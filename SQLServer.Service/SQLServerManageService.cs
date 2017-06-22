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
using System.Data;
using SQLServer.Domain;

namespace SQLServer.Service
{
    public class SQLServerManageService : DBService, IDBManageService
    {
        public SQLServerManageService(DBConnect dbConnect):base(dbConnect)
        {

        }

        [LogInterecpor]
        public bool Delete(RemoveFilter filter)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDynamicRepertory db = new SQLServerDynamicRepertory();
                    List<IndexViewModel> indexs = ServiceFactory.GetInstance().DatabaseService.GetTableIndexs(filter.TableName);
                    string key = indexs.FirstOrDefault(d => d.Type == IndexType.Primary).ColumnName;
                    return db.DbSet(filter.TableName).Delete($"{key} in ('{String.Join("','", filter.Selected)}')");
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the delete,error:{e.ToString()}");
                throw;
            }
        }

        [LogInterecpor]
        //[DBScopeInterecpor]
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
                    SQLServerDynamicRepertory db = new SQLServerDynamicRepertory();
                    var dbName = filter.TableName.Split('.').First();
                    var tbName = filter.TableName.Split('.').Last().Remove(0, 1);
                    tbName = tbName.Remove(tbName.Length - 1, 1);
                    int total = 1;
                    string search = String.IsNullOrEmpty(filter.Search.Key) ? "1=1" : $"{filter.Search.Key} like '%{filter.Search.Value}%'";
                    string select = filter.Selected == null || !filter.Selected.Any() ? "*" : String.Join(",", filter.Selected);
                    string orderBy = String.IsNullOrEmpty(filter.SortColumn) ? "1" : filter.SortColumn;
                    List<FieldViewModel> fileds = ServiceFactory.GetInstance().DatabaseService.GetTableFields(filter.TableName);
                    var vm = db.Use(dbName).DbSet(filter.TableName).Filter(select, search, orderBy, out total, filter.PageIndex, filter.PageSize, filter.IsAsc).ToViewModel(fileds);
                    vm.Total = total;
                    vm.PageIndex = filter.PageIndex;
                    vm.PageSize = filter.PageSize;
                    vm.PageCount = Convert.ToInt32(Math.Ceiling((double)total / filter.PageSize));
                    return vm;
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the select data,error:{e.ToString()}");
                throw;
            }
        }

        [LogInterecpor]
        public bool Update(UpdateFilter filter)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDynamicRepertory db = new SQLServerDynamicRepertory();
                    var dbName = filter.TableName.Split('.').First();
                    var tbName = filter.TableName.Split('.').Last().Remove(0, 1);
                    tbName = tbName.Remove(tbName.Length - 1, 1);
                    List<IndexViewModel>  indexs = ServiceFactory.GetInstance().DatabaseService.GetTableIndexs(filter.TableName);
                    foreach (var data in filter.Datas)
                    {
                        db.Update(data, indexs.FirstOrDefault(d => d.Type == IndexType.Primary).ColumnName);
                    }
                    return true;
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the update data,error:{e.ToString()}");
                throw;
            }
        }
    }
}
