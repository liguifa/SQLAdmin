using Common.Logger;
using Common.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class SQLAdminController : Controller
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult() { Data = SerializerHelper.SerializerObjectByJsonConvert(data),JsonRequestBehavior = behavior };
        }

        protected override void OnException(ExceptionContext filterContext)
        {

            base.OnException(filterContext);
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            mLog.Info($"Start request,url:{filterContext.HttpContext.Request.Url}.");
            base.OnActionExecuting(filterContext);
        }

        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            mLog.Info($"End request,url:{filterContext.HttpContext.Request.Url}.");
            base.OnActionExecuted(filterContext);
        }

        public void SetCookie(string name, object value)
        {
            string valueStr = SerializerHelper.SerializerObjectToBase64ByJsonConvert(value);
            Response.Cookies.Add(new HttpCookie(name, valueStr));
        }
    }
}