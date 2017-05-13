using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("..SysDatabases")]
    public class Database
    {
        [EntityColumn("dbid")]
        public short Id { get; set; }

        [EntityColumn("name")]
        public string Name { get; set; }

        //public List<Table> Tables { get; set; }
    }
}
