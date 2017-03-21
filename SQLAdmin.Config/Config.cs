using Common.Logger;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MMS.Config
{
    public class Config<T> : IDisposable where T : class
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);
        private readonly Action mAction;

        public Config(ActionType type = ActionType.Read)
        {
            this.mAction = new Action(typeof(T).Name, type);
        }

        public void Dispose()
        {
            this.mAction.Dispose();
        }

        public List<T> GetAll()
        {
            var configDatas = this.mAction.Select();
            List<T> configs = new List<T>();
            foreach (var configData in configDatas)
            {
                T configItem = Activator.CreateInstance<T>();
                foreach(var configProperty in configData)
                {
                    var property = configItem.GetType().GetProperty(configProperty.Key);
                    {
                        if (configProperty.Value is JArray)
                        {
                            var arrayData = (configProperty.Value as JArray).ToObject(property.PropertyType);
                            property.SetValue(configItem, arrayData);
                        }
                        else
                        {
                            property.SetValue(configItem, configProperty.Value);
                        }
                    }
                }
                configs.Add(configItem);
            }
            return configs;
        }

        public bool IsExist()
        {
            return this.mAction.IsExist();
        }

        public bool Create(List<T> datas)
        {
            foreach (var row in datas)
            {
                var properties = row.GetType().GetProperties();
                foreach (var property in properties)
                {
                    this.mAction.Set(property.Name, property.GetValue(row));
                }
                this.mAction.Insert();
            }
            return true;
        }
    }
}
