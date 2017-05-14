using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class MemoryViewModel
    {
        public int MemoryUtilization { get; set; }

        public long TotalMemory { get; set; }

        public long UseMemory { get; set; }

        public string EventTime { get; set; }
    }
}
