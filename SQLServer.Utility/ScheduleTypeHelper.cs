using Common.Utility;
using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Utility
{
    public static class MonitorTypeHelper
    {
        private static string mConfig = "MonitorType.config";

        public static Monitor GetMonitorByType(MonitorType type)
        {
            List<Monitor> monitors = SerializerHelper.DeserializeObjectFormFile<List<Monitor>>(mConfig);
            return monitors.Where(d => d.MonitorType == type).FirstOrDefault();
        }
    }

    public class Monitor
    {
        public string Assembly { get; set; }

        public string Type { get; set; }

        public string Method { get; set; }

        public MonitorType MonitorType { get; set; }

        public DBConnect DBConnect { get; set; }

        public int Threshold { get; set; }

        public string ToEmail { get; set; }
    }
}
