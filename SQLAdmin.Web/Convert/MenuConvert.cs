using MMS.Config.Dto;
using SQLAdmin.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Web.Convert
{
    public static class MenuConvert
    {
        public static List<MenuViewModel> ToViewModel(this List<Menu> menus)
        {
            List<MenuViewModel> vms = new List<MenuViewModel>();
            foreach (var menu in menus)
            {
                if (!String.IsNullOrEmpty(menu.Id))
                {
                    MenuViewModel vm = new MenuViewModel()
                    {
                        Id = Guid.Parse(menu.Id),
                        Title = menu.Title,
                        Icon = menu.Icon,
                        Href = menu.Address,
                        IsSelect = false,
                        Subs = menu.SubMenus?.ToViewModel()
                    };
                    vms.Add(vm);
                }
            }
            return vms;
        }
    }
}
