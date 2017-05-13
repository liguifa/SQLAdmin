using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class ConnectedViewModel
    {
        public string Ip { get; set; }

        public string EventTime { get; set; }
    }

    public class ConnectedSummaryViewModel
    {
        public string Ip { get; set; }

        public int Total { get; set; }
    }
}
