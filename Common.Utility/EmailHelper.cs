using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class EmailHelper
    {
        public static bool SendEmail(Email email)
        {
            MailMessage messuige = email.ToMailMessuige();
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.163.com";
            smtp.Port = 25;
            smtp.Credentials = new NetworkCredential("18840848462@163.com", "1qaz2wsxE");
            smtp.EnableSsl = true; //Gmail要求SSL连接
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network; //Gmail的发送方式是通过网络的方式，需要指定
            ServicePointManager.ServerCertificateValidationCallback = (s, c, cc, ss) => true;
            smtp.Send(messuige);
            return true;
        }
    }

    public static class ListExt
    {
        public static MailAddressCollection ToMailAddressCollection(this List<string> list)
        {
            MailAddressCollection mc = new MailAddressCollection();
            foreach(var item in list)
            {
                mc.Add(new MailAddress(item));
            }
            return mc;
        }

        public static void AddRange(this MailAddressCollection mailAddressCollection,List<string> targeList)
        {
            foreach(var item in targeList)
            {
                mailAddressCollection.Add(new MailAddress(item));
            }
        }

        public static MailMessage ToMailMessuige(this Email email)
        {
            MailMessage messuige = new MailMessage();
            messuige.To.AddRange(email.To);
            messuige.CC.AddRange(email.CC);
            messuige.To.AddRange(email.To);
            messuige.IsBodyHtml = true;
            messuige.Subject = email.Subject;
            messuige.SubjectEncoding = Encoding.UTF8;
            messuige.Body = email.Body;
            messuige.From = new MailAddress("18840848462@163.com");
            messuige.Sender = new MailAddress("18840848462@163.com");
          
            return messuige;
        }
    }

    public class Email
    {
        public List<string> To { get; set; } = new List<string>();

        public List<string> CC { get; set; } = new List<string>();

        public List<string> Bcc { get; set; } = new List<string>();

        public string Subject { get; set; }

        public string Body { get; set; }
    }
}
