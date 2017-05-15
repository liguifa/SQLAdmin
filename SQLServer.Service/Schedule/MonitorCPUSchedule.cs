using Common.Utility;
using SQLAdmin.Utility;
using SQLServer.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Service.Schedule
{
    public class MonitorCPUSchedule
    {
        public void Execute(SQLAdmin.TimerContract.Schedule schedule)
        {
            Monitor monitor = SerializerHelper.DeserializeObjectByJsonConvert<Monitor>(schedule.Context);
            SQLServerReportService reportService = new SQLServerReportService(monitor.DBConnect);
            CPUViewModel cpu = reportService.GetCPUInfos().FirstOrDefault();
            int used = cpu.DBProess + cpu.OtherProcess;
            if (used > monitor.Threshold)
            {
                Email email = new Email()
                {
                    To = new List<string>() { monitor.ToEmail },
                    Subject = "CPU 警报",
                    Body = $"Server:{monitor.DBConnect.Address},当前CPU使用率为:{used}%"
                };
                EmailHelper.SendEmail(email);
            }
        }
    }

    public class MonitorCPUDto
    {

    }
}
