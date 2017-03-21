using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Web.Models
{
    public class MenuViewModel
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Icon { get; set; }

        public string Href { get; set; }

        public bool IsSelect { get; set; }

        public List<MenuViewModel> Subs { get; set; }
    }
}
