using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Dao
{
    public interface IRepertory
    {
        List<Database> GetDatabases();

        List<Table> GetTabses(string dbName);
    }
}
