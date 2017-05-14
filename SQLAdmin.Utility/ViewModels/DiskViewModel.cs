using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility.ViewModels
{
    public class DiskViewModel
    {
        public string DatabaseName { get; set; }

        public string DriveName { get; set; }

        public long TotalSpace { get; set; }

        public long FreeSpace { get; set; }

        public long UsedSpace { get; set; }

        public double FreeSpacePercent { get; set; }
    }
}
