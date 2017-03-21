using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Config.Dto
{
    public class Menu
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Icon { get; set; }

        public string Address { get; set; }

        public List<Menu> SubMenus { get; set; }
    }
}
