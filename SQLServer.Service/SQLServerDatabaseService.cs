using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using SQLServer.Dao;
using SQLAdmin.Utility;

namespace SQLServer.Service
{
    public class SQLServerDatabaseService : DBService, IDatabaseService
    {
        public SQLServerDatabaseService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public bool CreateTable(Table table)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.CreateTable(table);
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the create table,error:{e.ToString()}");
                throw;
            }
        }

        public DatabaseTree GetDatabases()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetDatabases().To<DatabaseTree>();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get databases,error:{e.ToString()}");
                throw;
            }
        }

        public List<FieldType> GetFieldTypes()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetFieldTypes().ToList();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get field types,error:{e.ToString()}");
                throw;
            }
        }

        public List<Field> GetTableFields(string tableName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetTableFields(tableName).ToList();
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the get table fields,error:{e.ToString()}");
                throw;
            }
        }

        public List<Index> GetTableIndexs(string tableName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetTableIndexs(tableName).ToList();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get table indexs,error:{e.ToString()}");
                throw;
            }
        }

        public List<Table> GetTables(string tableName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.GetTables(tableName).To<List<Table>>();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get tables,error:{e.ToString()}");
                throw;
            }
        }
    }
}
