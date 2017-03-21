using SQLAdmin.Utility.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public static class NavigationHelper
    {
        private static readonly string mNavigationConfig = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config/Navigation.config");

        public static List<NavigationViewModel> GetNavigations()
        {
            using (FileStream fs = File.Open(mNavigationConfig, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                byte[] buffer = new byte[fs.Length];
                fs.Read(buffer, 0, buffer.Length);
                string config = Encoding.Default.GetString(buffer);
                return SerializeHelper.Deserialize<List<NavigationViewModel>>(config);
            }
        }
    }
}
