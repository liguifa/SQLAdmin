using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class Schedule
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string DisplayName { get; set; }

        public long StartTime { get; set; } = long.MinValue;

        public long EndTime { get; set; } = long.MaxValue;

        public long NextTime { get; set; }

        public IntervalType IntervalType { get; set; }

        public int Interval { get; set; }

        public MonitorType MonitorType { get; set; }

        public int Threshold { get; set; }

        public string ToEmail { get; set; }
    }

    public enum IntervalType
    {
        OnceOnly,
        Hour,
        Day,
    }

    public enum MonitorType
    {
        CPU,
    }
}
