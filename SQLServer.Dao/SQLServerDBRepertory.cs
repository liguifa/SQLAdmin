using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using System.Data.SqlClient;
using System.Data;
using SQLServer.Utility;
using System.Linq.Expressions;
using SQLServer.Domain;
using Common.Utility;

namespace SQLServer.Dao
{
    public class SQLServerDBRepertory : IRepertory
    {
        private string mDatabaseName = String.Empty;

        protected SQLServerDBContext DBContext
        {
            get
            {
                return SQLServerDBContextScope.DBContext as SQLServerDBContext;
            }
        }

        public SQLServerDBRepertory Use(string databaseName)
        {
            this.mDatabaseName = databaseName;
            return this;
        }

        public T Add<T>(T t, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> AddRange<T>(IEnumerable<T> TObjects, bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> All<T>() where T : class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T).GetEntityColumnNames()))
                                       .From($"{this.mDatabaseName}{typeof(T).GetEntityTableName()}")
                                       .Qenerate();
            return this.DBContext.SqlReader(sql).ToList<T>();
        }

        public bool Connect()
        {
            using (var conn = this.DBContext.GetConnect())
            {
                return conn != null;
            }
        }

        public bool Contains<T>(Expression<Func<T, bool>> predicate) where T : class
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

        public bool Exist<T>(T model) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> Filter<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T).GetEntityColumnNames()))
                                       .From($"{this.mDatabaseName}{typeof(T).GetEntityTableName()}")
                                       .Where(String.Join(" ", typeof(T).GetEntityColumnNames(LambdaHelper.GetConditions(predicate))))
                                       .Qenerate();
            return this.DBContext.SqlReader(sql).ToList<T>();
        }

        public List<TResult> Filter<T, TResult>(Expression<Func<T, TResult>> selector) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> Filter<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> orderBy) where T : class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T).GetEntityColumnNames()))
                                       .From($"{this.mDatabaseName}{typeof(T).GetEntityTableName()}")
                                       .Where(String.Join(" ", typeof(T).GetEntityColumnNames(LambdaHelper.GetConditions(predicate))))
                                       .OrderBy(typeof(T).GetEntityColumnName(LambdaHelper.GetColumn(orderBy).FirstOrDefault(),true))
                                       .Qenerate();
            return this.DBContext.SqlReader(sql).ToList<T>();
        }

        public List<T> Filter<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T : class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T).GetEntityColumnNames()))
                                       .From($"{this.mDatabaseName}{typeof(T).GetEntityTableName()}")
                                       .Where(String.Join(" ", typeof(T).GetEntityColumnNames(LambdaHelper.GetConditions(predicate))))
                                       .OrderBy(typeof(T).GetEntityColumnName(LambdaHelper.GetColumn(orderBy).FirstOrDefault(), true))
                                       .Skip((index - 1) * size)
                                       .Take(size)
                                       .Qenerate();
            total = 500;
            return this.DBContext.SqlReader(sql).ToList<T>();
        }

        public List<T1> CrossJoin<T1, T2, TCross, TResult>(Expression<Func<T1, TCross>> crossApply, Expression<Func<T1, bool>> predicate, Expression<Func<T1, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T1 : class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T1).GetEntityColumnNames()))
                                       .From($"{this.mDatabaseName}{typeof(T1).GetEntityTableName()}")
                                       .Cross($"{typeof(T2).GetEntityTableName()}({String.Join(",", typeof(T1).GetEntityColumnNames(LambdaHelper.GetColumn(crossApply)))})")
                                       .Where(String.Join(" ", typeof(T1).GetEntityColumnNames(LambdaHelper.GetConditions(predicate))))
                                       .OrderBy(typeof(T1).GetEntityColumnName(LambdaHelper.GetColumn(orderBy).FirstOrDefault(), true))
                                       .Skip((index - 1) * size)
                                       .Take(size)
                                       .Qenerate();
            total = this.Count<T1>(predicate);
            return this.DBContext.SqlReader(sql).ToList<T1>();
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
            string sql = new SQLQuery().Select($" top 1 {String.Join(",", typeof(T).GetEntityColumnNames())}")
                                       .From($"{this.mDatabaseName}{typeof(T).GetEntityTableName()}")
                                       .Where(String.Join(" ", typeof(T).GetEntityColumnNames(LambdaHelper.GetConditions(predicate))))
                                       .Qenerate();
            return this.DBContext.SqlReader(sql).ToList<T>().FirstOrDefault();
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

        public T Single<T>(Expression<Func<T, bool>> expression) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> SQLQuery<T>(string sql) where T : class
        {
            return this.DBContext.SqlReader(sql).ToList<T>();
        }

        public bool Update<T>(T t, string key = "ID", bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public bool UpdateRange<T>(IEnumerable<T> TObjects, string key = "ID", bool isSaveChange = false) where T : class
        {
            throw new NotImplementedException();
        }

        public List<T> All<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        public int Count<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            string sql = new SQLQuery().Select("count(*)")
                                     .From($"{this.mDatabaseName}{typeof(T).GetEntityTableName()}")
                                     .Where(String.Join(" ",typeof(T).GetEntityColumnNames(LambdaHelper.GetConditions(predicate))))
                                     .Qenerate();
            return Convert.ToInt32(this.DBContext.SqlScaler(sql));
        }
    }
}
