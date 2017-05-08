using SQLAdmin.Dao;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLServer.Dao;
using System;
using System.Collections.Generic;
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

        public List<ConnectedInfo> GetConnectedInfos()
        {
            throw new NotImplementedException();
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
    }
}
