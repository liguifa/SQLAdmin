using SQLAdmin.Domain;
using SQLAdmin.Domain;
using SQLAdmin.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public interface IDatabaseService
    {
        DatabaseTreeViewModel GetDatabases();

        List<TableViewModel> GetTables(string tableName);

        List<FieldTypeViewModel> GetFieldTypes();

        bool CreateTable(TableViewModel table);

        List<FieldViewModel> GetTableFields(string tableName);

        List<IndexViewModel> GetTableIndexs(string tableName);

        bool DeleteDatabase(string databaseName);
    }
}
