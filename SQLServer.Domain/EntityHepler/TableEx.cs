using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
    }
}
