using Common.Logger;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MMS.MongoDB
{
    public class Select
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);
        private MongoClient mMongoClient;

        public Select(MongoClient mongoClient)
        {
            this.mMongoClient = mongoClient;
        }

        public string SelectAll(string database,string collection)
        {
            //MongoDatabase db = this.mServer.GetDatabase(database);
            //MongoCollection collectionTemp = db.GetCollection(collection);
            //MongoCursor cursor = collectionTemp.FindAllAs<TDocument>();
            return null;
        }
    }
}
