using MMS.UI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Installation
{
    public class MongoSetViewModel : BaseINotifyPropertyChanged
    {
        private static MongoSetViewModel mongo;
        private static readonly object syncRoot = new object();

        private MongoSetViewModel()
        {
            this.ScanButton = new ScanMongodButton();
        }

        public static MongoSetViewModel GetInstance()
        {
            if (mongo == null)
            {
                lock (syncRoot)
                {
                    if (mongo == null)
                    {
                        mongo = new MongoSetViewModel();
                    }
                }
            }
            return mongo;
        }

        public ScanMongodButton ScanButton { get; set; }

        private string mMongodPath = String.Empty;
        public string MongodPath { get { return this.mMongodPath; } set { this.mMongodPath = value; OnPropertyChanged("MongodPath"); } }
    }
}
