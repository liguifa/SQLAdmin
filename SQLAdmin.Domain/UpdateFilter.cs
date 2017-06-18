using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class UpdateFilter
    {
        public string TableName { get; set; }

        public List<dynamic> Datas { get; set; }
    }
}
