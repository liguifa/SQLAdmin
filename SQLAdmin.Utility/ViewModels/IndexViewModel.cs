using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class IndexViewModel
    {
        public int Id { get; set; }

        public string ColumnName { get; set; }

        public string IndexName { get; set; }

        public IndexType Type { get; set; }
    }

    public enum IndexType
    {
        Primary,
        Foreign
    }
}
