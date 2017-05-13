using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class DatabaseTreeViewModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }

        public DBTreeNodeType NodeType { get; set; }

        public List<DatabaseTreeViewModel> Children { get; set; }
    }

    public enum DBTreeNodeType
    {
        Server,
        Menu,
        Docmenu,
        List
    }
}
