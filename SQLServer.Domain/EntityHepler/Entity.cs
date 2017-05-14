using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    public static class Entity
    {
        public static string GetEntityTableName(this Type type)
        {
                return type.GetCustomAttributes(false).OfType<EntityTableAttribute>().FirstOrDefault().EntityName;
        }

        public static List<string> GetEntityColumnNames(this Type type)
        {
            PropertyInfo[] properties = type.GetProperties();
            return properties.Select(d => d.GetCustomAttributes(false).OfType<EntityColumnAttribute>().FirstOrDefault()?.EntityName).Where(d => !String.IsNullOrEmpty(d)).ToList();
        }

        public static string GetEntityColumnName(this Type type,string propertyName)
        {
            PropertyInfo property = type.GetProperty(propertyName);
            return property?.GetCustomAttributes(false).OfType<EntityColumnAttribute>().FirstOrDefault()?.EntityName;
        }

        public static List<string> GetEntityColumnNames(this Type type, List<string> propertiesName)
        {
            List<string> returnEntityNames = new List<string>();
            foreach(string propertyName in propertiesName)
            {
                var entityName = GetEntityColumnName(type, propertyName);
                if(!String.IsNullOrEmpty(entityName))
                {
                    returnEntityNames.Add(entityName);
                }
                else
                {
                    returnEntityNames.Add(propertyName);
                }
            }
            return returnEntityNames;
        }
    }
}
