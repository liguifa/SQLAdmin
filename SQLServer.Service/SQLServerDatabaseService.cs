using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using SQLServer.Dao;
using SQLAdmin.Utility;
using SQLServer.Domain;
using SQLServer.Utility;

namespace SQLServer.Service
{
    public class SQLServerDatabaseService : DBService, IDatabaseService
    {
        public SQLServerDatabaseService(DBConnect dbConnect) : base(dbConnect)
        {

        }

        public bool CreateTable(TableViewModel table)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return false;
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the create table,error:{e.ToString()}");
                throw;
            }
        }

        public bool DeleteDatabase(string databaseName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.Use(databaseName).Delete<Database>(d=>d.Name == databaseName);
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the create table,error:{e.ToString()}");
                throw;
            }
        }

        public DatabaseTreeViewModel GetDatabases()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    List<Product> products = db.Exec<Product>();
                    return db.All<Database>().ToViewModel(this.mDBConnect, products);
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get databases,error:{e.ToString()}");
                throw;
            }
        }

        public List<FieldTypeViewModel> GetFieldTypes()
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.All<FieldType>().ToViewModel();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get field types,error:{e.ToString()}");
                throw;
            }
        }

        public List<FieldViewModel> GetTableFields(string tableName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    var dbName = tableName.Split('.').First();
                    var tbName = tableName.Split('.').Last().Remove(0, 1);
                    tbName = tbName.Remove(tbName.Length - 1, 1);
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    Table table = db.Use(dbName).Find<Table>(d => d.Type == "U" && d.Name == tbName);
                    long id = table.Id;
                    return db.Use(dbName).Filter<Field, string>(d => d.Id == id, d => d.Name).ToViewModel();
                }
            }
            catch(Exception e)
            {
                mLog.Error($"An error has occurred in the get table fields,error:{e.ToString()}");
                throw;
            }
        }

        public List<IndexViewModel> GetTableIndexs(string tableName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    var dbName = tableName.Split('.').First();
                    var tbName = tableName.Split('.').Last().Remove(0, 1);
                    tbName = tbName.Remove(tbName.Length - 1, 1);
                    return db.SQLQuery<Index>($"select _index.id as id,_index.indid as indid,_index.name as indname,_col.name as colname from {dbName}..SysColumns as _col join (select t_key.id, t_key.indid,t_key.colid,t_index.name from {dbName}..sysindexkeys as t_key inner join {dbName}..sysindexes as t_index on t_key.indid = t_index.indid  where t_key.id = t_index.id and t_key.id=(select id from {dbName}..sysobjects where Name = '{tbName}')) as _index on _index.colid = _col.colid where _col.id = _index.id").ToViewModel();
                }
            }
            catch (Exception e)
            {
                mLog.Error($"An error has occurred in the get table indexs,error:{e.ToString()}");
                throw;
            }
        }

        public List<TableViewModel> GetTables(string tableName)
        {
            try
            {
                using (var scope = new SQLServerDBContextScope(this.mDBConnect))
                {
                    SQLServerDBRepertory db = new SQLServerDBRepertory();
                    return db.Use(tableName).Filter<Table, string>(d => d.Type == "U", d => d.Name).ToViewModel(tableName);
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
