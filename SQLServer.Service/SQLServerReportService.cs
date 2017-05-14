using Common.Analysis.SQLAnalysis;
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
                    List<RingBuffer> buffers = db.Filter<RingBuffer, DateTime>(d => d.Type == "RING_BUFFER_SCHEDULER_MONITOR" && d.Record.Contains("<SystemHealth>"), d => d.EventTime);
                    List<CPUViewModel> cpuInfos = new List<CPUViewModel>();
                    foreach (RingBuffer buffer in buffers)
                    {
                        CPUViewModel info = RingBufferHelper.ParseXMLToCPUnfo(buffer.Record);
                        info.EventTime = buffer.EventTime.ToLocalTime().ToString();
                        cpuInfos.Add(info);
                    }
                    return cpuInfos;
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<MemoryViewModel> GetMemoryInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    List<RingBuffer> buffers = db.Filter<RingBuffer, DateTime>(d => d.Type == "RING_BUFFER_SCHEDULER_MONITOR" && d.Record.Contains("<SystemHealth>"), d => d.EventTime);
                    SystemInfo system = db.Find<SystemInfo>(d => d.PhysicalMemory > 0);
                    List<MemoryViewModel> memoryInfos = new List<MemoryViewModel>();
                    foreach(RingBuffer buffer in buffers)
                    {
                        MemoryViewModel info = RingBufferHelper.ParseXMLToMemoryInfo(buffer.Record);
                        info.TotalMemory = system.PhysicalMemory;
                        info.UseMemory = Convert.ToInt32(system.PhysicalMemory * ((double)info.MemoryUtilization / 100));
                        info.EventTime = buffer.EventTime.ToLocalTime().ToString();
                        memoryInfos.Add(info);
                    }
                    return memoryInfos;
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public List<DiskViewModel> GetDiskInfos()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    int total = 0;
                    List<Disk> disks = db.CrossJoin<Disk, DmOSVolumeStats, dynamic, string>(d => new { d.DatabaseId, d.FileId }, d => d.DatabaseId > 0, d => d.DatabaseName, out total, 1, int.MaxValue, true);
                    return disks.ToViewModel();
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

        #region TODO
        /// <summary>
        /// TODO
        /// </summary>
        /// <returns></returns>
        public List<QueryProportionViewModel> GetQueryProportionForTable()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    List<QueryProportionViewModel> infos = new List<QueryProportionViewModel>();
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    int total = 0;
                    List<QueryHistory> queries = db.CrossJoin<QueryHistory, DmExecSQLText, byte[], DateTime>(d => d.SQLHandle, d => d.LastReturnRows > -1, d => d.LastExecutionTime, out total, 1, int.MaxValue, true);
                    object syncRoot = new object();
                    Parallel.ForEach(queries, query =>
                    {
                        List<SQLNode> nodes = SQLParse.Parse(query.Text);
                        if (nodes != null && nodes.Any())
                        {
                            nodes.FirstOrDefault(d => d.Type == SQLNodeType.FORM);

                            //TODO
                        }
                    });
                    //return info;
                    //TODO
                    return null;
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }
        #endregion
    }
}
