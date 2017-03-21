using MongoDB.Driver;
using SQLAdmin.Dao;
using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MongoDB.Dao
{
    public class MongoDBContext : DBContext
    {
        public MongoClient MongoClient { get; set; }
    }
}
