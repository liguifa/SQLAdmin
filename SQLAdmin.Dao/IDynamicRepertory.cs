using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;

namespace SQLAdmin.Dao
{
    public interface IDynamicRepertory
    {
        bool Connect();

        List<dynamic> All(string where);

        int Count(string where);

        List<dynamic> Filter(string where);

        List<dynamic> FilterSimple(string where);

        List<dynamic> FilterWithNodynamicracking(string where);

        List<dynamic> Filter(string where, string orderBy, out int total, int index = 0, int size = 50, bool isAsc = true);

        List<dynamic> Filter(string where, string orderBy);

        bool Contains(string where);

        dynamic Find(params object[] keys);

        dynamic Find(string where);

        dynamic Add(dynamic t, bool isSaveChange = false);

        List<dynamic> AddRange(IEnumerable<dynamic> dynamicObjects, bool isSaveChange = false);

        bool Delete(dynamic t, bool isSaveChange = false);

        bool DeleteRange(IEnumerable<dynamic> dynamicObjects, bool isSaveChange = false);

        bool Delete(string where, bool isSaveChange = false);

        bool Update(dynamic t, string key = "ID", bool isSaveChange = false);

        bool UpdateRange(IEnumerable<dynamic> dynamicObjects, string key = "ID", bool isSaveChange = false);

        dynamic Single(string where);

        bool Exist(dynamic model);

        List<dynamic> SQLQuery(string sql);
    }
}
