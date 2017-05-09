using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Utility
{
    public static class TableExt
    {
        public static List<T> ToList<T>(this DataTable table, Func<DataRow, T> toT) where T : class
        {
            List<T> outResult = new List<T>();
            foreach (DataRow row in table.Rows)
            {
                T t = toT(row);
                if (t != null)
                {
                    outResult.Add(t);
                }
            }
            return outResult;
        }
    }
}
