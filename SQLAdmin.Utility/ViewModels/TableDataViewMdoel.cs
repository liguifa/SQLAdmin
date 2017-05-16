using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility.ViewModels
{
    public class TableDataViewMdoel
    {
        public List<dynamic> Datas { get; set; }

        public long Total { get; set; }

        public long PageCount { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }
    }
}
