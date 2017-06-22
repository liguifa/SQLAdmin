using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Dao
{
    public abstract class DBContext : MarshalByRefObject
    {
        public DBConnect ConnectSetting { get; set; }
    }
}
