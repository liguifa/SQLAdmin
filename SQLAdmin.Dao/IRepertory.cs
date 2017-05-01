using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Dao
{
    public interface IRepertory
    {
        bool Connect();

        List<Database> GetDatabases();

        List<Table> GetTables(string dbName);

        bool CreateTable(Table table);

        List<FieldType> GetFieldTypes();

        DataTable Filter(DataFilter filter);
    }
}
