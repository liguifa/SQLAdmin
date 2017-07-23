using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using MMS.MongoDB;
using MongoDB.Dao;
using SQLAdmin.Dao;
using SQLAdmin.Utility;

namespace MongoDB.Service
{
    public class MongoDBDatabaseService : DBService, IDatabaseService
    {
        public MongoDBDatabaseService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public bool CreateTable(TableViewModel table)
        {
            throw new NotImplementedException();
        }

        public bool DeleteDatabase(string databaseName)
        {
            throw new NotImplementedException();
        }

        public DatabaseTreeViewModel GetDatabases()
        {
            throw new NotImplementedException();
        }

        public List<FieldTypeViewModel> GetFieldTypes()
        {
            throw new NotImplementedException();
        }

        public List<FieldViewModel> GetTableFields(string tableName)
        {
            throw new NotImplementedException();
        }

        public List<IndexViewModel> GetTableIndexs(string tableName)
        {
            throw new NotImplementedException();
        }

        public List<TableViewModel> GetTables(string tableName)
        {
            throw new NotImplementedException();
        }

        //public DatabaseTree GetDatabases()
        //{
        //    try
        //    {
        //        using (var scope = new MongoDBContextScope(this.mDBConnect))
        //        {
        //            IRepertory db = new MognoDBRepertory();
        //            return db.GetDatabases().ToList().To<DatabaseTree>();
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        mLog.Error($"An error has occurred in the get databases,error:{e.ToString()}");
        //        throw;
        //    }
        //}

        //public List<Table> GetTables(string tableName)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
