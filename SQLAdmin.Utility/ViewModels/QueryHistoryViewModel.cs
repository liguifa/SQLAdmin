using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility.ViewModels
{
    public class QueryHistoryViewModel
    {
        public List<QueryHistoryInfoViewModel> QueryHistories { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int PageCount { get; set; }
    }

    public class QueryHistoryInfoViewModel
    {
        public string Text { get; set; }

        public string LastExecutionTime { get; set; }

        public long LastCPUTime { get; set; }

        public long MinCPUTime { get; set; }

        public long MaxCPUTime { get; set; }

        public long LastExecuteTime { get; set; }

        public long MinExecuteTime { get; set; }

        public long MaxExecuteTime { get; set; }

        public long LastReturnRows { get; set; }

        public long MinReturnRows { get; set; }

        public long MaxReturnRows { get; set; }
    }
}
