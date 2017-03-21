using Common.Cryptogram;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class SerializerHelper
    {
        public static T DeserializeObjectFormFile<T>(string filename)
        {
            string fileFullname = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, filename);
            using (FileStream fs = File.OpenRead(fileFullname))
            {
                byte[] buffer = new byte[fs.Length];
                fs.Read(buffer, 0, buffer.Length);
                string json = Encoding.UTF8.GetString(buffer);
                return JsonConvert.DeserializeObject<T>(json);
            }
        }

        public static string SerializerObjectToBase64ByJsonConvert(object obj)
        {
            var json = SerializerObjectByJsonConvert(obj);
            return Base64.Encrypt(json);
        }

        public static string SerializerObjectByJsonConvert(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}
