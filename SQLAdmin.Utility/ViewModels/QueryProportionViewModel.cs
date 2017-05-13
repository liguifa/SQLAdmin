using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class QueryProportionViewModel
    {
        public int SelectCount { get; set; }

        public int InsertCount { get; set; }

        public int DeleteCount { get; set; }

        public int UpdateCount { get; set; }
        
        public string TableName { get; set; }
    }
}
