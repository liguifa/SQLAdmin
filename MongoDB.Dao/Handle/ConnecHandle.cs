using MMS.Command;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.MongoDB
{
    public class ConnecHandle
    {
        private MongoClient mMongoClient;

        public ConnecHandle(MongoClient mongoClient)
        {
            this.mMongoClient = mongoClient;
        }

        public bool Connect(string name, string address, string username, string password)
        {
            try
            {
                string strconn = "mongodb://127.0.0.1:27017";
                this.mMongoClient = new MongoClient(strconn);
            }
            catch (Exception e)
            {

            }
            return true;
        }

        public bool DisConnect(string name)
        {
            return true;
        }
    }
}
