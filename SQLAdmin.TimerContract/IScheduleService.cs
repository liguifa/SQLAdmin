using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.TimerContract
{
    [ServiceContract(Name = "IScheduleService",Namespace = "SQLAdmin.TimerContract")]
    public interface IScheduleService
    {
        [OperationContract]
        bool AddScheduleService(Schedule schedule);

        [OperationContract]
        List<Schedule> GetAllSchedules();
    }
}
