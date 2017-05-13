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
        protected SQLServerDBContext DBContext
        {
            get
            {
                return SQLServerDBContextScope.DBContext as SQLServerDBContext;
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

        public List<T> All<T>() where T : class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T).GetEntityColumnNames()))
                                       .From(typeof(T).GetEntityTableName())
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
            string sql = new SQLQuery().Select(String.Join(",", typeof(T).GetEntityColumnNames()))
                                       .From(typeof(T).GetEntityTableName())
                                       .OrderBy("last_execution_time")
                                       .Skip((index - 1) * size)
                                       .Take(size)
                                       .Qenerate();
            total = 500;
            return this.DBContext.SqlReader(sql).ToList<T>();
        }

        public List<T1> CrossJoin<T1,T2,TCross, TResult>(Expression<Func<T1, TCross>> crossApply, Expression<Func<T1, bool>> predicate, Expression<Func<T1, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T1 :class
        {
            string sql = new SQLQuery().Select(String.Join(",", typeof(T1).GetEntityColumnNames()))
                                       .From(typeof(T1).GetEntityTableName())
                                       .Cross($"{typeof(T2).GetEntityTableName()}({typeof(T1).GetEntityColumnName(LambdaHelper.GetColumn(crossApply))})")
                                       .OrderBy(typeof(T1).GetEntityColumnName(LambdaHelper.GetColumn(orderBy)))
                                       .Skip((index - 1) * size)
                                       .Take(size)
                                       .Qenerate();
            total = 500;
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
    }
}
