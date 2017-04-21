using Common.Cryptogram;
using Common.Utility;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLAdmin.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.App_Start
{
    public class InjectAttribute:ActionFilterAttribute
    {
        private bool mIsInject = false;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            DatabaseConfigViewModel databaseConfig = filterContext.ActionParameters.Keys.Contains(Constant.DATABASE_CONFIG) ? filterContext.ActionParameters[Constant.DATABASE_CONFIG] as DatabaseConfigViewModel : null;
            if (databaseConfig == null)
            {
                databaseConfig = SerializerHelper.DeserializeObjectByJsonConvert<DatabaseConfigViewModel>(filterContext.HttpContext.Request.Headers[Constant.DATABASE_CONFIG]);
            }
            if (databaseConfig != null)
            {
                DBConnect dbConnect = new DBConnect() { Address = databaseConfig.Address, Port = databaseConfig.Port, Userename = databaseConfig.Username, Password = Base64.Decrypt(databaseConfig.Password) };
                ServiceFactory.Register(databaseConfig.Type, dbConnect);
                this.mIsInject = true;
            }
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (this.mIsInject)
            {
                ServiceFactory.UnRegister();
            }
        }
    }
}