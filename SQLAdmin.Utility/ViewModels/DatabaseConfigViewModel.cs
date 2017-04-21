using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Web.Models
{
    public class DatabaseConfigViewModel
    {
        public long Type { get; set; }

        public string Address { get; set; }

        public int Port { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public bool IsLogin { get; set; }
    }
}
