using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MMS.UI.Common;

namespace MMS.UnInstallation
{
    public class FinishViewModel : BaseINotifyPropertyChanged
    {
        private static FinishViewModel finish;
        private static readonly object syncRoot = new object();

        private FinishViewModel()
        {
        }

        public static FinishViewModel GetInstance()
        {
            if (finish == null)
            {
                lock (syncRoot)
                {
                    if (finish == null)
                    {
                        finish = new FinishViewModel();
                    }
                }
            }
            return finish;
        }

        private string mMessage = "卸载完成.";
        public string Message { get { return this.mMessage; } set { this.mMessage = value; OnPropertyChanged("Message"); } }
    }
}
