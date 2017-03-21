using MMS.UI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MMS.Installation
{
    public class ProcessViewModel : BaseINotifyPropertyChanged
    {
        private static ProcessViewModel process;
        private static readonly object syncRoot = new object();

        private ProcessViewModel()
        {
        }

        public static ProcessViewModel GetInstance()
        {
            if (process == null)
            {
                lock (syncRoot)
                {
                    if (process == null)
                    {
                        process = new ProcessViewModel();
                    }
                }
            }
            return process;
        }

        private string mProgressText = String.Empty;
        public string ProgressText { get { return this.mProgressText; } set { this.mProgressText = value; OnPropertyChanged("ProgressText"); } }

        private string mProgressPercent = String.Empty;
        public string ProgressPercent { get { return this.mProgressPercent; } set { this.mProgressPercent = value; OnPropertyChanged("ProgressPercent"); } }

        private int mProgressValue = 0;
        public int ProgressValue { get { return this.mProgressValue; } set { this.mProgressValue = value; OnPropertyChanged("ProgressValue"); } }

        public void RefreshProgressBar(string text, int value)
        {
            this.ProgressText = text;
            this.ProgressValue = value;
            this.ProgressPercent = String.Format("{0}%", value);
            if(value==100)
            {
                Thread.Sleep(1000);
                Navigation.GetInstance().Next();
            }
        }
    }
}
