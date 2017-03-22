using Common.Cryptogram;
using Common.Logger;
using MMS.Command;
using MMS.Config;
using MMS.MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using SQLAdmin.Dao;
using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MongoDB.Dao
{
    public class MognoDBRepertory : IRepertory
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        protected MongoDBContext DBContext
        {
            get
            {
                return MongoDBContextScope.DBContext as MongoDBContext;
            }
        }

        public bool Connect()
        {
            throw new NotImplementedException();
        }

        public List<Database> GetDatabases()
        {
            var dbs = new List<BsonDocument>();
            this.DBContext.MongoClient.ListDatabases().ForEachAsync(db => dbs.Add(db));
            List<Database> databases = new List<Database>();
            foreach (var doc in dbs)
            {
                Database db = new Database();
                db.Name = doc["name"].ToString();
                db.Tables = this.GetTabses(db.Name);
                databases.Add(db);
            }
            return databases;
        }

        public List<Table> GetTabses(string dbName)
        {
            var collections = new List<BsonDocument>();
            this.DBContext.MongoClient.GetDatabase(dbName).ListCollections().ForEachAsync(collection => collections.Add(collection));
            List<Table> tables = new List<Table>();
            foreach(var collection in collections)
            {
                var table = new Table();
                table.Name = collection["name"].ToString();
                tables.Add(table);
            }
            return tables;
        }
    }
}
