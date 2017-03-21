using MMS.Config;
using MMS.Config.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class MenuHelper
    {
        public static List<Menu> GetMenus()
        {
            using (Config<Menu> config = new Config<Menu>(ActionType.Write))
            {
                if (!config.IsExist())
                {
                    List<Menu> menus = SerializerHelper.DeserializeObjectFormFile<List<Menu>>(Constant.MENU_CONFIG_FILE);
                    config.Create(menus);
                }
                return config.GetAll();
            }
        }
    }
}
