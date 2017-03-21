using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace MMS.TimerService
{
    public partial class TimerService : ServiceBase
    {
        private Process mTimrProcess;

        public TimerService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            this.mTimrProcess = new Process();
            this.mTimrProcess.StartInfo = new ProcessStartInfo();
            this.mTimrProcess.StartInfo.FileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "MMS.TimerMain.exe");
            this.mTimrProcess.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            this.mTimrProcess.Start();
        }

        protected override void OnStop()
        {
            this.mTimrProcess.Close();
            this.mTimrProcess.Dispose();
        }
    }
}
