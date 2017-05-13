using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    public class EntityTableAttribute : Attribute
    { 
        public string EntityName { get; private set; }

        public EntityTableAttribute(string name)
        {
            this.EntityName = name;
        }
    }
}
