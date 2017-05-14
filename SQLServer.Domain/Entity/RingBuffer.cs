using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("sys.dm_os_ring_buffers")]
    public class RingBuffer
    {
        [EntityColumn("ring_buffer_type")]
        public string Type { get; set; }

        [EntityColumn("timestamp", "DATEADD(ms, -1 * ((SELECT cpu_ticks/(cpu_ticks/ms_ticks) FROM sys.dm_os_sys_info)- [timestamp]), GETDATE()) as timestamp")]
        public DateTime EventTime { get; set; }

        [EntityColumn("record")]
        public string Record { get; set; }
    }
}
