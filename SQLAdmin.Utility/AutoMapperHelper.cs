using SQLAdmin.Domain;
using System.Collections.Generic;
using System.Data;

namespace SQLAdmin.Utility
{
    public static class AutoMapperHelper
    {
        public static List<SQLAdmin.Domain.Schedule> ToSchedules(this List<SQLAdmin.TimerContract.Schedule> schedules)
        {
            List<SQLAdmin.Domain.Schedule> outSchedules = new List<Schedule>();
            foreach(var schedule in schedules)
            {
                SQLAdmin.Domain.Schedule outSchedule = new Schedule();
                outSchedule.DisplayName = schedule.DisplayName;
                outSchedule.StartTime = schedule.StartTime;
                outSchedule.NextTime = schedule.NextTime;
                outSchedule.EndTime = schedule.EndTime;
                outSchedule.Interval = outSchedule.Interval;
                outSchedule.IntervalType = outSchedule.IntervalType;
                outSchedules.Add(outSchedule);
            }
            return outSchedules;
        }
    }
}
