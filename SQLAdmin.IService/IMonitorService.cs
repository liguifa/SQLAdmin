using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public interface IMonitorService
    {
        List<Schedule> GetAllSchedule();

        bool AddSchedule(SQLAdmin.Domain.Schedule schedule);
    }
}
