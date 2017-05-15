using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.TimerContract
{
    [Serializable]
    [DataContract(Name = "Schedule", Namespace = "SQLAdmin.TimerContract")]
    public class Schedule
    {
        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string DisplayName { get; set; }

        [DataMember]
        public string Assembly { get; set; }

        [DataMember]
        public string Type { get; set; }

        [DataMember]
        public string Method { get; set; }

        [DataMember]
        public DateTime StartTime { get; set; } = DateTime.UtcNow;

        [DataMember]
        public DateTime EndTime { get; set; } = DateTime.MaxValue;

        [DataMember]
        public DateTime NextTime { get; set; }

        [DataMember]
        public IntervalType IntervalType { get; set; }

        [DataMember]
        public int Interval { get; set; }

        [DataMember]
        public string Context { get; set; }
    }

    public enum IntervalType
    {
        OnceOnly,
        Hour,
        Day,
    }
}
