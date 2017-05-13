using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Dao
{
    public interface IRepertory
    {
        bool Connect();

        List<T> All<T>() where T : class;

        List<T> Filter<T>(Expression<Func<T, bool>> predicate) where T : class;

        List<T> FilterSimple<T>(Expression<Func<T, bool>> predicate) where T : class;

        List<T> FilterWithNoTracking<T>(Expression<Func<T, bool>> predicate) where T : class;

        List<T> Filter<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T : class;

        List<TResult> Filter<T, TResult>(Expression<Func<T, TResult>> selector) where T : class;

        List<T> Filter<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> orderBy) where T : class;

        List<T1> CrossJoin<T1, T2, TCross, TResult>(Expression<Func<T1, TCross>> crossApply, Expression<Func<T1, bool>> predicate, Expression<Func<T1, TResult>> orderBy, out int total, int index = 0, int size = 50, bool isAsc = true) where T1 : class;

        bool Contains<T>(Expression<Func<T, bool>> predicate) where T : class;

        T Find<T>(params object[] keys) where T : class;

        T Find<T>(Expression<Func<T, bool>> predicate) where T : class;

        List<T> FindWithOrderBy<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> order) where T : class;

        List<T> FindWithOrderByDescending<T, TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>> order) where T : class;

        T Add<T>(T t, bool isSaveChange = false) where T : class;

        List<T> AddRange<T>(IEnumerable<T> TObjects, bool isSaveChange = false) where T : class;

        bool Delete<T>(T t, bool isSaveChange = false) where T : class;

        bool DeleteRange<T>(IEnumerable<T> TObjects, bool isSaveChange = false) where T : class;

        bool Delete<T>(Expression<Func<T, bool>> predicate, bool isSaveChange = false) where T : class;

        bool Update<T>(T t, string key = "ID", bool isSaveChange = false) where T : class;

        bool UpdateRange<T>(IEnumerable<T> TObjects, string key = "ID", bool isSaveChange = false) where T : class;

        T Single<T>(Expression<Func<T, bool>> expression) where T : class;

        bool Exist<T>(T model) where T : class;

        List<T> SQLQuery<T>(string sql) where T : class;
    }
}
