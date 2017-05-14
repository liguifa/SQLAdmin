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

        public string SelectName { get; private set; }

        public EntityColumnAttribute(string name,string selectName = default(string))
        {
            this.EntityName = name;
            this.SelectName = selectName;
        }
    }
}
