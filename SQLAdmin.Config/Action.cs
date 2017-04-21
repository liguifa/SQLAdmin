using Common.Cryptogram;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MMS.Config
{
    public class Action : IDisposable
    {
        private readonly string mConn = String.Format(System.Configuration.ConfigurationManager.ConnectionStrings["conn"].ToString(), AppDomain.CurrentDomain.BaseDirectory);
        private List<Dictionary<string, object>> mCache = new List<Dictionary<string, object>>();
        private string mTableName = String.Empty;
        private ActionType mType = ActionType.Read;
        private bool mIsWrite = false;

        public Action(string tableName, ActionType type = ActionType.Read)
        {
            this.mType = type;
            this.mTableName = tableName;
            var table = Path.Combine(this.mConn, $"{tableName}.db");
            if (!File.Exists(table))
            {
                using (var fs = File.Create(table))
                {
                }
            }
            var config = String.Empty;
            using (FileStream fs = File.Open(table, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                byte[] buffer = new byte[fs.Length];
                fs.Read(buffer, 0, buffer.Length);
                config = Encoding.UTF8.GetString(buffer, 0, buffer.Length);
            }
            if (!String.IsNullOrEmpty(config))
            {
                this.ParseJson(config);
            }
        }

        public bool IsExist()
        {
            return this.mCache.Count > 1;
        }

        public void Set(string key, object value)
        {
            Dictionary<string, dynamic> dictionary = new Dictionary<string, dynamic>();
            if (this.mCache.Count > 0)
            {
                dictionary = this.mCache.Last();
                if (dictionary.Keys.Contains(key))
                {
                    dictionary.Remove(key);
                }
            }
            dictionary.Add(key, value);
            if (this.mCache.Count == 0)
            {
                this.mCache.Add(dictionary);
            }
        }

        public void Insert(InsertOption option = InsertOption.Row)
        {
            this.mCache.Add(new Dictionary<string, object>());
            this.mIsWrite = true;
        }

        public void Dispose()
        {
            if (this.mType == ActionType.Write && this.mIsWrite)
            {
                var json = this.BuildJson();
                var table = Path.Combine(this.mConn, $"{this.mTableName}.db");
                if (!File.Exists(table))
                {
                    File.Create(table);
                }
                var config = String.Empty;
                using (FileStream fs = File.Open(table, FileMode.Open, FileAccess.Write, FileShare.Write))
                {
                    byte[] buffer = Encoding.UTF8.GetBytes(json);
                    fs.Write(buffer, 0, buffer.Length);
                }
            }
        }

        public string BuildJson()
        {
            var last = this.mCache.Last();
            this.mCache.Remove(last);
            var cacheJson = JsonConvert.SerializeObject(this.mCache, Formatting.Indented);
            return Base64.Encrypt(cacheJson);
        }

        private void ParseJson(string config)
        {
            config = Base64.Decrypt(config);
            this.mCache = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(config);
        }

        public List<Dictionary<string, object>> Select()
        {
            return this.mCache;
        }
    }

    public enum ActionType
    {
        Read,
        Write
    }

    public enum InsertOption
    {
        Row,
        Column
    }
}
