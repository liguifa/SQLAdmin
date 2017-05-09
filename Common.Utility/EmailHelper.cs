using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class EmailHelper
    {
        public static bool SendEmail(Email email)
        {
            MailMessage message = email.ToMailMessage();
            SmtpClient smtp = new SmtpClient();
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

        public static MailMessage ToMailMessage(this Email email)
        {
            MailMessage message = new MailMessage();
            message.To.AddRange(email.To);
            message.CC.AddRange(email.CC);
            message.To.AddRange(email.To);
            message.IsBodyHtml = true;
            message.Subject = email.Subject;
            message.SubjectEncoding = Encoding.UTF8;
            message.Body = email.Body;
            return message;
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
