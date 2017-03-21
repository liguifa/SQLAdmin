using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MMS.Command
{
    public class RunCommand : IDisposable
    {
        private readonly Process mProcess;
        private List<string> mOutPut;

        public RunCommand()
        {
            this.mProcess = new Process();
        }

        /// <summary>
        /// 调用这是方法默认启动Mongo和Mongodb shell  只有StartCommand执行这个方法
        /// </summary>
        /// <returns></returns>
        public bool Start(Command cmd)
        {
            Process process = new Process();
            process.StartInfo = new ProcessStartInfo();
            process.StartInfo.FileName = cmd.GetExecCmd();
            process.StartInfo.Arguments = cmd.GetArguments();
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.OutputDataReceived += Process_OutputDataReceived;
            process.Start();
            process.BeginOutputReadLine();
            Thread.Sleep(2000);
            return true;
        }

        private void Process_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            if (!String.IsNullOrEmpty(e.Data))
            {
                File.AppendAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "1.log"), e.Data + "\r\n");
            }
        }

        private void Process_OutputDataReceived2(object sender, DataReceivedEventArgs e)
        {
            if (!String.IsNullOrEmpty(e.Data))
            {
                File.AppendAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "2.log"), e.Data + "\r\n");
                this.mOutPut.Add(e.Data);
            }
        }

        public bool Shell(Command cmd)
        {
            this.mOutPut = new List<string>();
            this.mProcess.StartInfo = new ProcessStartInfo();
            this.mProcess.StartInfo = new ProcessStartInfo();
            this.mProcess.StartInfo.FileName = cmd.GetExecCmd();
            this.mProcess.StartInfo.Arguments = cmd.GetArguments();
            this.mProcess.StartInfo.UseShellExecute = false;
            this.mProcess.StartInfo.CreateNoWindow = true;
            //this.mProcess.StartInfo.RedirectStandardOutput = true;
            this.mProcess.StartInfo.RedirectStandardInput = true;//接受来自调用程序的输入信息
            this.mProcess.StartInfo.RedirectStandardOutput = true;//由调用程序获取输出信息
            //this.mProcess.StartInfo.RedirectStandardError = true;//重定向标准错误输出
            this.mProcess.OutputDataReceived += Process_OutputDataReceived2;
            this.mProcess.Start();
            this.mProcess.BeginOutputReadLine();
            Thread.Sleep(2000);
            return true;
        }

        public List<string> Run(Command cmd)
        {
            this.mOutPut = new List<string>();
            this.mProcess.StandardInput.WriteLine(cmd.GetCmd() + " &exit");
            this.mProcess.StandardInput.AutoFlush = true;
            //this.mProcess.WaitForExit();//等待程序执行完退出进程
            //string output = this.mProcess.StandardOutput.ReadToEnd();
            Thread.Sleep(2000);
            return this.mOutPut;
        }

        public void Dispose()
        {
            this.mProcess.Dispose();
        }
    }
}
