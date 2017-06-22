using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    public static class TableExt
    {
        public static List<T> ToList<T>(this DataTable table) where T : class
        {
            List<T> entities = new List<T>();
            foreach (DataRow row in table.Rows)
            {
                T entity = Activator.CreateInstance<T>();
                var properties = typeof(T).GetProperties();
                Parallel.ForEach(properties, property =>
                {
                    string column = property.GetCustomAttributes(false).OfType<EntityColumnAttribute>().FirstOrDefault()?.EntityName;
                    if (!String.IsNullOrEmpty(column))
                    {
                        object value = row[column];
                        property.SetValue(entity, value);
                    }
                });
                entities.Add(entity);
            }
            return entities;
        }

        public static List<dynamic> ToList(this DataTable table)
        {
            List<dynamic> entities = new List<dynamic>();
            List<string> columns = new List<string>();
            foreach(DataColumn column in table.Columns)
            {
                columns.Add(column.ColumnName);
            }
            columns = columns.OrderBy(d => d).ToList();
            foreach (DataRow row in table.Rows)
            {
                dynamic entity = new ExpandoObject();
                foreach (string column in columns)
                {
                    (entity as IDictionary<string, object>).Add(column, row[column]);
                }
                entities.Add(entity);
            }
            return entities;
        }

        public static Dictionary<string,object> ToDictionary(this object t)
        {
            Dictionary<string, object> dics = new Dictionary<string, object>();
            PropertyInfo[] properties = t.GetType().GetProperties();
            Parallel.ForEach(properties, property =>
            {
                var value = property.GetValue(t);
                dics.Add(property.Name, value);
            });
            return dics;
        }
    }
}
