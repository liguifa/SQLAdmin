using SQLServer.Domain.EntityProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("..SysColumns")]
    public class Field: Entity
    {
        [EntityColumn("id")]
        public long Id { get; set; }

        [EntityColumn("name")]
        public string Name { get; set; }

        [EntityColumn("xtype")]
        public int TypeId { get; set; }

        //[NavProperty(nameof(TypeId))]
        //public virtual FieldType Type { get; set; }
    }
}
