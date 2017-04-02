using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Domain
{
    public class DatabaseTree
    {
        public string Name { get; set; }

        public DBTreeNodeType NodeType { get; set; }

        public List<DatabaseTree> Children { get; set; }
    }

    public enum DBTreeNodeType
    {
        Server,
        Menu,
        Docmenu,
        List
    }
}
