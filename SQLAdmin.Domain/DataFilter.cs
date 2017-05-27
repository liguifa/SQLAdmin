using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class DataFilter
    {
        public string TableName { get; set; }

        public int PageIndex { get; set; } = 1;

        public int PageSize { get; set; } = 50;

        public string SortColumn { get; set; }

        public bool IsAsc { get; set; }

        public Search Search { get; set; } = new Search();

        public List<string> Selected { get; set; }
    }

    public class Search
    {
        public string Key { get; set; }

        public string Value { get; set; }
    }
}
