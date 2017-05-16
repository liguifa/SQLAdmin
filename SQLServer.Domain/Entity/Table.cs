using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("..SysObjects")]
    public class Table
    {
        [EntityColumn("id")]
        public long Id { get; set; }

        [EntityColumn("name")]
        public string Name { get; set;}

        [EntityColumn("xtype")]
        public string Type { get; set; }
    }
}
