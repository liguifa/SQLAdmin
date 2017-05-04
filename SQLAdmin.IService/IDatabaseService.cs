using SQLAdmin.Domain;
using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public interface IDatabaseService
    {
        DatabaseTree GetDatabases();

        List<Table> GetTables(string tableName);

        List<FieldType> GetFieldTypes();

        bool CreateTable(Table table);

        List<Field> GetTableFields(string tableName);

        List<Index> GetTableIndexs(string tableName);
    }
}
