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
using SQLServer.Utility;
using Common.Utility;
using System.Reflection;

namespace SQLServer.Service
{
    public class SQLServerMonitorService : DBService, IMonitorService
    {
        public SQLServerMonitorService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public bool AddSchedule(SQLAdmin.Domain.Schedule schedule)
        {
            using (ChannelFactory<IScheduleService> channelFactory = new ChannelFactory<IScheduleService>("SQLAdmin.Timer"))
            {
                try
                {
                    IScheduleService proxy = channelFactory.CreateChannel();
                    SQLAdmin.TimerContract.Schedule entitySchedule = schedule.ToEntity();
                    Monitor monitor = MonitorTypeHelper.GetMonitorByType(schedule.MonitorType);
                    entitySchedule.Type = monitor.Type;
                    entitySchedule.Method = monitor.Method;
                    entitySchedule.Assembly = monitor.Assembly;
                    monitor.Threshold = schedule.Threshold;
                    monitor.ToEmail = schedule.ToEmail;
                    monitor.DBConnect = this.mDBConnect;
                    entitySchedule.Context = SerializerHelper.SerializerObjectByJsonConvert(monitor);
                    return proxy.AddSchedule(entitySchedule);
                }
                catch (Exception e)
                {
                    throw;
                }
            }
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

        public dynamic GetMonitorTypes()
        {
            var monitorTypes = typeof(MonitorType).GetFields(BindingFlags.Static | BindingFlags.Public).Select(d => new { Index = d.GetValue(null), DisplayName = d.Name });
            var intervalTypes = typeof(SQLAdmin.Domain.IntervalType).GetFields(BindingFlags.Static | BindingFlags.Public).Select(d => new { Index = d.GetValue(null), DisplayName = d.Name });
            return new { MonitorTypes = monitorTypes, IntervalTypes = intervalTypes };
        }
    }
}
