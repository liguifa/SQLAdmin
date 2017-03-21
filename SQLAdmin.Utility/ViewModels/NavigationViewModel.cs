using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility.ViewModels
{
    public class NavigationViewModel
    {
        public string Title { get; set; }

        public int ShortcutKey { get; set;}

        public List<SubMenu> SubMenus { get; set; }
    }

    public class SubMenu: NavigationViewModel
    {
        public string Icon { get; set; }
    }
}
