using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class TableViewModel
    {
        public string Id { get; set; }

        public string Name { get; set;}

        public Guid DatabaseId { get; set; } 

        public string Fullname { get; set; }
    }
}
