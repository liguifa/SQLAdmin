using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class Database
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public List<Table> Tables { get; set; }
    }
}
