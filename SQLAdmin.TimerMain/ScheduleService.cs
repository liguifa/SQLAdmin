using Common.Utility;
using MMS.Config;
using SQLAdmin.TimerContract;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.TimerMain
{
    public class ScheduleService : IScheduleService
    {
        private static string mConfigPath = "schedule.config";
        private static object mSyncRoot = new object();

        public ScheduleService()
        {
            string filename = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, mConfigPath);
            if(!File.Exists(filename))
            {
                lock(mSyncRoot)
                {
                    if(!File.Exists(filename))
                    {
                        File.Create(filename).Close();
                    }
                }
            }
        }

        public bool AddSchedule(Schedule schedule)
        {
            List<Schedule> schedules = this.GetAllSchedules();
            if (schedules == null)
            {
                schedules = new List<Schedule>();
            }
            schedules.Add(schedule);
            SerializerHelper.SerializerObjectToFile(schedules, mConfigPath);
            return true;
        }

        public List<Schedule> GetAllSchedules()
        {
            return SerializerHelper.DeserializeObjectFormFile<List<Schedule>>(mConfigPath);
        }
    }
}
