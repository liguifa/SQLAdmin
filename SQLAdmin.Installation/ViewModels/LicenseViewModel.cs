using MMS.UI.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Installation
{
    public class LicenseViewModel : BaseINotifyPropertyChanged
    {
        private static LicenseViewModel mLicense;
        private static readonly object syncRoot = new object();

        private LicenseViewModel()
        {
            this.LicenseText = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "License.txt"));
        }

        public static LicenseViewModel GetInstance()
        {
            if (mLicense == null)
            {
                lock (syncRoot)
                {
                    if (mLicense == null)
                    {
                        mLicense = new LicenseViewModel();
                    }
                }
            }
            return mLicense;
        }

        public string LicenseText { get; set; }
    }
}
