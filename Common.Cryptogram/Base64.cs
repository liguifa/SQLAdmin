using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Cryptogram
{
    /// <summary>
    /// Base64加解密类
    /// </summary>
    public static class Base64
    {
        /// <summary>
        /// Base64加密
        /// </summary>
        /// <param name="value">需要加密的值</param>
        /// <returns>加密后的值</returns>
        public static string Encrypt(string value)
        {
            string base64string = String.Empty;
            byte[] bytes = Encoding.UTF8.GetBytes(value);
            try
            {
                base64string = Convert.ToBase64String(bytes);
            }
            catch
            {
                base64string = value;
            }
            return base64string;
        }

        /// <summary>
        /// Base64解密
        /// </summary>
        /// <param name="value">需要解密的值</param>
        /// <returns>解密后的值</returns>
        public static string Decrypt(string value)
        {
            string base64string = String.Empty;
            try
            {
                byte[] bytes = Convert.FromBase64String(value);
                return Encoding.UTF8.GetString(bytes, 0, bytes.Length);
            }
            catch (Exception e)
            {
                base64string = value;
            }
            return base64string;
        }
    }
}
