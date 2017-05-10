using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.TimerContract
{
    [DataContract(Name = "Schedule", Namespace = "SQLAdmin.TimerContract")]
    public class Schedule
    {
        public Guid Id { get; set; }

        public string DisplayName { get; set; }

        public string Assembly { get; set; }

        public string Type { get; set; }

        public string Method { get; set; }

        public DateTime StartTime { get; set; } = DateTime.UtcNow;

        public DateTime EndTime { get; set; } = DateTime.MaxValue;

        public DateTime NextTime { get; set; }

        public IntervalType IntervalType { get; set; }

        public int Interval { get; set; }
    }

    public enum IntervalType
    {
        OnceOnly,
        Hour,
        Day,
    }
}
