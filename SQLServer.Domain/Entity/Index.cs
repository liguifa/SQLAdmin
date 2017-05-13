using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("..SysColumns")]
    public class Index
    {
        [EntityColumn("ID")]
        public string Id { get; set; }

        [EntityColumn("clname")]
        public string ColumnName { get; set; }

        [EntityColumn("indname")]
        public string IndexName { get; set; }
    }
}
