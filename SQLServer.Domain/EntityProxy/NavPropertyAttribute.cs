using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain.EntityProxy
{
    public class NavPropertyAttribute:Attribute
    {
        public string Name { get; set; }

        public NavPropertyAttribute(string name)
        {
            this.Name = name;
        }
    }
}
