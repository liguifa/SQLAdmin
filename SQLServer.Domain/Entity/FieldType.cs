using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("sys.types")]
    public class FieldType
    {
        [EntityColumn("name")]
        public string DisplayName { get; set; }

        [EntityColumn("max_length")]
        public int MaxLength { get; set; }

        [EntityColumn("is_nullable")]
        public int IsNullable { get; set; }
    }
}
