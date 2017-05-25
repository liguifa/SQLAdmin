using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("[sys].[xp_msver]")]
    public class Product
    {
        [EntityColumn("Index")]
        public int Index { get; set; }

        [EntityColumn("Name")]
        public string Name { get; set; }

        [EntityColumn("Character_Value")]
        public object Value { get; set; }
    }
}
