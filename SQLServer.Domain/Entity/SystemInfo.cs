using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("sys.dm_os_sys_info")]
    public class SystemInfo
    {
        [EntityColumn("physical_memory_kb")]
        public long PhysicalMemory { get; set; }
    }
}
