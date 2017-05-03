using Common.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SQLAdmin.Web.App_Start
{
    public static class ExceptionHandler
    {
        public static void ErrorHanding(Exception e)
        {
            var request = HttpContext.Current.Request;
            var response = HttpContext.Current.Response;
            Exception exception = e.InnerException == null ? e : e.InnerException;
            if (request["X-Requested-With"] != "XMLHttpRequest" && request.Headers["X-Requested-With"] != "XMLHttpRequest")
            {

                response.Write(SerializerHelper.SerializerObjectByJsonConvert(new ErroeMessage() { Message = exception.Message }));
            }
            else
            {
                response.Redirect("");
            }
            response.Flush();
            response.End();
        }
    }

    public class ErroeMessage
    {
        public bool IsSuccess { get; set; } = false;

        public string Message { get; set; } = String.Empty;
    }
}