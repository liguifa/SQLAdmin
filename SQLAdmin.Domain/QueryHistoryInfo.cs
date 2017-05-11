using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class QueryHistoryInfo
    {
        public string Text { get; set; }

        public string LastExecutionTime { get; set; }

        public string LastCPUTime { get; set; }

        public string MinCPUTime { get; set; }

        public string MaxCPUTime { get; set; }

        public string LastExecuteTime { get; set; }

        public string MinExecuteTime { get; set; }

        public string MaxExecuteTime { get; set; }

        public string LastReturnRows { get; set; }

        public string MinReturnRows { get; set; }

        public string MaxReturnRows { get; set; }
    }
}
