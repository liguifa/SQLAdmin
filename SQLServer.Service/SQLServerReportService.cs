using SQLAdmin.Dao;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLAdmin.Utility;
using SQLAdmin.Utility.ViewModels;
using SQLServer.Dao;
using SQLServer.Domain;
using SQLServer.Utility;
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

        public QueryHistoryViewModel GetQueryHistories(DataFilter filter)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    int total = 0;
                    List<QueryHistoryInfoViewModel> queryHistories = db.CrossJoin<QueryHistory, DmExecSQLText, byte[], DateTime>(d => d.SQLHandle, d => d.LastReturnRows > -1, d => d.LastExecutionTime, out total, filter.PageIndex, filter.PageSize, filter.IsAsc).ToViewModel();
                    return new QueryHistoryViewModel()
                    {
                        QueryHistories = queryHistories,
                        PageIndex = filter.PageIndex,
                        PageSize = filter.PageSize,
                        PageCount = Convert.ToInt32(Math.Ceiling((double)total / filter.PageSize))
                    };
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<ConnectedViewModel> GetConnectedInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    List<RingBuffer> buffers = db.Filter<RingBuffer>(d => d.Type == "RING_BUFFER_CONNECTIVITY");
                    return new List<ConnectedViewModel>();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<ConnectedSummaryViewModel> GetConnectedSummary()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();

                    return new List<ConnectedSummaryViewModel>();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<CPUViewModel> GetCPUInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return new List<CPUViewModel>();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<ExceptionViewModel> GetExceptionInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return new List<ExceptionViewModel>();
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public QueryProportionViewModel GetAllQueryProportionInfo()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    QueryProportionViewModel info = new QueryProportionViewModel();
                    Dictionary<string, dynamic> queryConfig = new Dictionary<string, dynamic>() { { "Select",new ExpandoObject() }, { "Delete", new ExpandoObject() }, { "Update", new ExpandoObject() }, { "Insert", new ExpandoObject() } };
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    int total = 0;
                    List<QueryHistory> queries = db.CrossJoin<QueryHistory, DmExecSQLText, byte[], DateTime>(d => d.SQLHandle, d => d.LastReturnRows > -1, d => d.LastExecutionTime, out total, 1, int.MaxValue, true);
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
                        typeof(QueryProportionViewModel).GetProperty($"{queryIndex.Key}Count").SetValue(info,Convert.ToInt32(queryIndex.Value.Count));
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
