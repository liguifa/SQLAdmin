using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    public class EntityColumnAttribute : Attribute
    { 
        public string EntityName { get; private set; }

        public EntityColumnAttribute(string name)
        {
            this.EntityName = name;
        }
    }
}
