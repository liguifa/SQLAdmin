using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("sys.dm_exec_query_stats")]
    public class QueryHistory
    {
        [EntityColumn("sql_handle")]
        public Byte[] SQLHandle { get; set; }

        [EntityColumn("text")]
        public string Text { get; set; }

        [EntityColumn("last_execution_time")]
        public DateTime LastExecutionTime { get; set; }

        [EntityColumn("last_worker_time")]
        public long LastCPUTime { get; set; }

        [EntityColumn("min_worker_time")]
        public long MinCPUTime { get; set; }

        [EntityColumn("max_worker_time")]
        public long MaxCPUTime { get; set; }

        [EntityColumn("last_elapsed_time")]
        public long LastExecuteTime { get; set; }

        [EntityColumn("min_elapsed_time")]
        public long MinExecuteTime { get; set; }

        [EntityColumn("max_elapsed_time")]
        public long MaxExecuteTime { get; set; }

        [EntityColumn("last_rows")]
        public long LastReturnRows { get; set; }

        [EntityColumn("min_rows")]
        public long MinReturnRows { get; set; }

        [EntityColumn("max_rows")]
        public long MaxReturnRows { get; set; }
    }
}
