using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using System.ServiceModel;
using SQLAdmin.TimerContract;
using SQLAdmin.Utility;

namespace SQLServer.Service
{
    public class SQLServerMonitorService : DBService, IMonitorService
    {
        public SQLServerMonitorService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public List<SQLAdmin.Domain.Schedule> GetAllSchedule()
        {
            using (ChannelFactory<IScheduleService> channelFactory = new ChannelFactory<IScheduleService>("SQLAdmin.Timer"))
            {
                try
                {
                    IScheduleService proxy = channelFactory.CreateChannel();
                    return proxy.GetAllSchedules().ToSchedules();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }
    }
}
