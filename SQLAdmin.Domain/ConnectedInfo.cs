using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class ConnectedInfo
    {
        public string Ip { get; set; }

        public string EventTime { get; set; }
    }

    public class ConnectedSummary
    {
        public string Ip { get; set; }

        public int Total { get; set; }
    }
}
