using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class CPUInfo
    {
        public string EventTime { get; set; }

        public int DBProess { get; set; }

        public int IDLEProcess { get; set; }

        public int OtherProcess { get; set; }
    }
}
