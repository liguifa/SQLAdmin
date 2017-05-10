using Common.Logger;
using SQLAdmin.TimerMain;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SQLAdmin.TimerService
{
    public partial class TimerService : ServiceBase
    {
        private ServiceHost mHost;
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        public TimerService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            try
            {
                Task.Run(() =>
                {
#if DEBUG
                    while (File.Exists(@"C:\SQLAdmin.Timer.sleep"))
                    {
                        Thread.Sleep(1000);
                    }
#endif
                    this.mHost = new ServiceHost(typeof(ScheduleService));
                    this.mHost.Open();
                    TimerActivator.Start();
                });
            }
            catch(Exception e)
            {
                mLog.Error(e.ToString());
            }
        }

        protected override void OnStop()
        {
            try
            {
                this.mHost.Close();
                TimerActivator.Stop();
            }
            catch(Exception e)
            {
                mLog.Error(e.ToString());
            }
        }
    }
}
