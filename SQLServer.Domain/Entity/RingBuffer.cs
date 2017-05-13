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

        [EntityColumn("timestamp")]
        public string EventTime { get; set; }

        [EntityColumn("record")]
        public string Record { get; set; }
    }
}
