using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class DBConnect
    {
        public string Address { get; set; }

        public int Port { get; set; }

        public string Userename { get; set; }

        public string Password { get; set; }
    }
}
