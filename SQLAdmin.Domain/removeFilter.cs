using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class RemoveFilter
    {
        public string TableName { get; set; }

        public List<string> Selected { get; set; }
    }
}
