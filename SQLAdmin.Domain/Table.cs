using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class Table
    {
        public string Id { get; set; }

        public string Name { get; set;}

        public Guid DatabaseId { get; set; } 

        public string Fullname { get; set; }
    }
}
