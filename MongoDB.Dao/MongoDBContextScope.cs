using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using MongoDB.Driver;
using MongoDB.Dao;

namespace MMS.MongoDB
{
    public class MongoDBContextScope : DBContextScope
    {
        public MongoDBContextScope(DBConnect dbConnect) : base(dbConnect)
        {

        }

        //protected override DBConnect Initialize(DBConnect dbConnect)
        //{
        //    //string strconn = "mongodb://127.0.0.1:27017";
        //    //MongoClient mongoClient = new MongoClient(strconn);
        //    //DBContext = new MongoDBContext()
        //    //{
        //    //    ConnectSetting = dbConnect,
        //    //    MongoClient = mongoClient
        //    //};
        //    return new DBConnect();
        //}

        protected override DBContext Initialize(DBConnect dbConnect)
        {
            throw new NotImplementedException();
        }
    }
}
