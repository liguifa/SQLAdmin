using MMS.UI.Common;
using MMS.UI.Default;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Client
{
    public class MongoDBBackupWindowViewModel : BaseINotifyPropertyChanged
    {
        private static MongoDBBackupWindowViewModel mBackupWindow;
        private static readonly object mSyncRoot = new object();

        private MongoDBBackupWindowViewModel()
        {
            Init();
        }

        public static MongoDBBackupWindowViewModel GetInstance()
        {
            if (mBackupWindow == null)
            {
                lock (mSyncRoot)
                {
                    if (mBackupWindow == null)
                    {
                        mBackupWindow = new MongoDBBackupWindowViewModel();
                    }
                }
            }
            return mBackupWindow;
        }

        private void Init()
        {
            this.MongoDBBackupMenu = new List<NavigationItem>()
            {
                new NavigationItem()
                {
                    Status = NavigationType.Process,
                    Text = "MongoDB 备份",
                    Url = null
                }
            };
            this.DBList = new List<MongoDatabase>()
            {
                new MongoDatabase()
                {
                     Name = "master"
                },
                new MongoDatabase()
                {
                    Name = "trunk"
                }
            };
            this.TimeSpanList = new List<AssignmentTimeSpan>()
            {
                new AssignmentTimeSpan()
                {
                     TimeSpan = "-天"
                },
                new AssignmentTimeSpan()
                {
                     TimeSpan = "-小时"
                },
            };
        }

        public List<NavigationItem> MongoDBBackupMenu { get; set; }

        private List<MongoDatabase> mDBList = null;
        public List<MongoDatabase> DBList { get { return this.mDBList; } set { this.mDBList = value; OnPropertyChanged("DBList"); } }

        private List<AssignmentTimeSpan> mTimeSpanList = null;
        public List<AssignmentTimeSpan> TimeSpanList { get { return this.mTimeSpanList; } set { this.mTimeSpanList = value; OnPropertyChanged("TimeSpanList"); } }
    }

    public class MongoDatabase
    {
        public string Name { get; set; }
    }

    public class AssignmentTimeSpan
    {
        public string TimeSpan { get; set; }
    }
}
