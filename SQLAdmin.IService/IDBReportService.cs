using SQLAdmin.Domain;
using SQLAdmin.Utility;
using SQLAdmin.Utility.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public interface IDBReportService
    {
        List<CPUViewModel> GetCPUInfos();

        List<ConnectedViewModel> GetConnectedInfos();

        List<ConnectedSummaryViewModel> GetConnectedSummary();

        List<ExceptionViewModel> GetExceptionInfos();

        List<QueryHistoryViewModel> GetQueryHistories(DataFilter filter);

        QueryProportionViewModel GetAllQueryProportionInfo();
    }
}
