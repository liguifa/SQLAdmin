using Common.Cryptogram;
using Common.Utility;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLAdmin.Web.App_Start;
using SQLAdmin.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class ConnectController : SQLAdminController
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Inject]
        public JsonResult LoginDb(DatabaseConfigViewModel databaseConfig)
        {
            databaseConfig.IsLogin = ServiceFactory.GetInstance().DBConnectService.Connect();
            return Json(databaseConfig);
        }
    }
}