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
                outSchedule.Id = schedule.Id;
                outSchedule.DisplayName = schedule.DisplayName;
                outSchedule.StartTime = schedule.StartTime;
                outSchedule.NextTime = schedule.NextTime;
                outSchedule.EndTime = schedule.EndTime;
                outSchedule.Interval = schedule.Interval;
                outSchedule.IntervalType = (SQLAdmin.Domain.IntervalType)schedule.IntervalType;
                outSchedules.Add(outSchedule);
            }
            return outSchedules;
        }

        public static SQLAdmin.TimerContract.Schedule ToEntity(this SQLAdmin.Domain.Schedule schedule)
        {
            SQLAdmin.TimerContract.Schedule outSchedule = new TimerContract.Schedule();
            if(schedule != null)
            {
                outSchedule.Id = schedule.Id;
                outSchedule.DisplayName = schedule.DisplayName;
                outSchedule.StartTime = schedule.StartTime;
                outSchedule.NextTime = schedule.NextTime;
                outSchedule.EndTime = schedule.EndTime;
                outSchedule.Interval = schedule.Interval;
                outSchedule.IntervalType = (SQLAdmin.TimerContract.IntervalType)schedule.IntervalType;
            }
            return outSchedule;
        }
    }
}
