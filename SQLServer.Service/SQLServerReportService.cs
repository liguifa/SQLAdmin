using SQLAdmin.Dao;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLServer.Dao;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Service
{
    public class SQLServerReportService : DBService, IDBReportService
    {
        public SQLServerReportService(DBConnect dbConnect) :base(dbConnect)
        {

        }

        public List<QueryHistoryInfo> GetQueryHistories()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetQueryHistories();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<ConnectedInfo> GetConnectedInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetConnectedInfos();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<ConnectedSummary> GetConnectedSummary()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    List<ConnectedInfo> infos = db.GetConnectedInfos();
                    return infos.Select(d => d.Ip).Distinct().Select(d => new ConnectedSummary() { Ip = d, Total = infos.Count(i => d == i.Ip) }).ToList();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<CPUInfo> GetCPUInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetCPUInfos();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<ExceptionInfo> GetExceptionInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetExceptionInfos();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public QueryProportionInfo GetAllQueryProportionInfo()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    QueryProportionInfo info = new QueryProportionInfo();
                    Dictionary<string, dynamic> queryConfig = new Dictionary<string, dynamic>() { { "Select",new ExpandoObject() }, { "Delete", new ExpandoObject() }, { "Update", new ExpandoObject() }, { "Insert", new ExpandoObject() } };
                    List<QueryHistoryInfo> queries = this.GetQueryHistories();
                    foreach (var queryIndex in queryConfig)
                    {
                        queryIndex.Value.Count = 0;
                    }
                    Parallel.ForEach(queries, query =>
                    {
                        string sql = query.Text;
                        foreach (var queryIndex in queryConfig)
                        {
                            queryIndex.Value.Index = sql.IndexOf(queryIndex.Key, StringComparison.OrdinalIgnoreCase);
                        }
                        queryConfig.OrderByDescending(d => d.Value.Index).First().Value.Count += 1;
                    });
                    foreach (var queryIndex in queryConfig)
                    {
                        typeof(QueryProportionInfo).GetProperty($"{queryIndex.Key}Count").SetValue(info,Convert.ToInt32(queryIndex.Value.Count));
                    }
                    return info;
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }
    }
}
