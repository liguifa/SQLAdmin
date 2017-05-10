using MMS.Config;
using SQLAdmin.TimerContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.TimerMain
{
    public class ScheduleService : IScheduleService
    {
        public bool AddScheduleService(Schedule schedule)
        {
            Config<Schedule> config = new Config<Schedule>();
            return true;
        }

        public List<Schedule> GetAllSchedules()
        {
            return new List<Schedule>(){ new Schedule() {  DisplayName = "testc"} };
        }

        public List<Schedule> GetSchedules()
        {
            return null;
        }
    }
}
