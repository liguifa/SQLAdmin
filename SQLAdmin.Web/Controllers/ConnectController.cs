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
        public JsonResult LoginDb(LoginViewModel vm)
        {
            ServiceFactory.DBConnectService.Connect(new DBConnect() { Address = ".", Userename = "sa", Password = "123456" });
            vm.IsLogin = true;
            SetCookie(PageId, vm);
            return Json(vm);
        }
    }
}