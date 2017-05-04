using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class Index
    {
        public string Id { get; set; }

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
