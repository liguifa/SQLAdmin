using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class FieldType
    {
        public string DisplayName { get; set; }

        public int MaxLength { get; set; }

        public int IsNullable { get; set; }
    }
}
