using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class DynamicHelper
    {
        public static Dictionary<string, string> ToDictionary(this object t)
        {
            Dictionary<string, string> dics = new Dictionary<string, string>();
            Parallel.ForEach((JObject)t, (KeyValuePair<string,JToken> property) =>
            {
                dics.Add(property.Key, property.Value?.ToString());
            });
            return dics;
        }
    }
}
