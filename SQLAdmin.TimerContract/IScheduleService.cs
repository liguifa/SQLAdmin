using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.TimerContract
{
    public interface IScheduleService
    {
        bool AddScheduleService(Schedule schedule);
    }
}
