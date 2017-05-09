using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public interface IDBReportService
    {
        List<CPUInfo> GetCPUInfos();

        List<ConnectedInfo> GetConnectedInfos();

        List<ConnectedSummary> GetConnectedSummary();

        List<ExceptionInfo> GetExceptionInfos();
    }
}
