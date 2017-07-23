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
using System.Linq.Expressions;

namespace MongoDB.Dao
{
    public class MognoDBRepertory : IRepertory
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        protected MongoDBContext DBContext
        {
            get
            {
                return MongoDBContextScope.GetDBContext() as MongoDBContext;
            }
        }

        public T Add<T>(T t, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> AddRange<T>(IEnumerable<T> TObjects, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> All<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public bool Connect()
        {
            throw new NotImplementedException();
        }

        public bool Contains<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public int Count<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T1> CrossJoin<T1, T2, TCross, TResult>(Expression<Func<T1, TCross>> crossApply, Expression<Func<T1, bool>> predicate, Expression<Func<T1, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T1 : class
        {
            throw new NotImplementedException();
        }

        public bool Delete<T>(Expression<Func<T, bool>> predicate, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public bool Delete<T>(T t, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public bool DeleteRange<T>(IEnumerable<T> TObjects, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> Exec<T>() where T : class
        {
            throw new NotImplementedException();
        }

        public bool Exist<T>(T model) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> Filter<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public List<TResult> Filter<T, TResult>(Expression<Func<T, TResult>> selector) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> Filter<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> orderBy) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> Filter<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> FilterSimple<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> FilterWithNoTracking<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public T Find<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public T Find<T>(params object[] keys) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> FindWithOrderBy<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> order) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> FindWithOrderByDescending<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> order) where T : class
        {
            throw new NotImplementedException();
        }

        //public List<Database> GetDatabases()
        //{
        //    var dbs = new List<BsonDocument>();
        //    this.DBContext.MongoClient.ListDatabases().ForEachAsync(db => dbs.Add(db));
        //    List<Database> databases = new List<Database>();
        //    foreach (var doc in dbs)
        //    {
        //        Database db = new Database();
        //        db.Name = doc["name"].ToString();
        //        db.Tables = this.GetTabses(db.Name);
        //        databases.Add(db);
        //    }
        //    return databases;
        //}

        //public List<Table> GetTables(string dbName)
        //{
        //    throw new NotImplementedException();
        //}

        //public List<Table> GetTabses(string dbName)
        //{
        //    var collections = new List<BsonDocument>();
        //    this.DBContext.MongoClient.GetDatabase(dbName).ListCollections().ForEachAsync(collection => collections.Add(collection));
        //    List<Table> tables = new List<Table>();
        //    foreach(var collection in collections)
        //    {
        //        var table = new Table();
        //        table.Name = collection["name"].ToString();
        //        tables.Add(table);
        //    }
        //    return tables;
        //}

        public T Single<T>(Expression<Func<T, bool>> expression) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> SQLQuery<T>(string sql) where T : class
        {
            throw new NotImplementedException();
        }

        public bool Update<T>(T t, string key = "ID", bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public bool UpdateRange<T>(IEnumerable<T> TObjects, string key = "ID", bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }
    }
}
