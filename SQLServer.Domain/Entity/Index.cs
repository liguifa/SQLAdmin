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
        public int Id { get; set; }

        [EntityColumn("colname")]
        public string ColumnName { get; set; }

        [EntityColumn("indname")]
        public string IndexName { get; set; }
    }
}
