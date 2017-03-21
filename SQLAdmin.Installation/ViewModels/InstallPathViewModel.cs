using MMS.UI.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Installation
{
    public class InstallPathViewModel : BaseINotifyPropertyChanged
    {
        private static InstallPathViewModel install;
        private static readonly object syncRoot = new object();

        private InstallPathViewModel()
        {
            this.ScanButton = new ScanInstallButton();
        }

        public static InstallPathViewModel GetInstance()
        {
            if (install == null)
            {
                lock (syncRoot)
                {
                    if (install == null)
                    {
                        install = new InstallPathViewModel();
                    }
                }
            }
            return install;
        }

        private string mInstallPath = Path.Combine(System.Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "MMS");
        public string InstallPath { get { return this.mInstallPath; } set { this.mInstallPath = value; OnPropertyChanged("InstallPath"); } }

        public ScanInstallButton ScanButton { get; set; }
    }
}
