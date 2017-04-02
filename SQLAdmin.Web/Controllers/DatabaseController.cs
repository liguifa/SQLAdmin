using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class DatabaseController : SQLAdminController
    {
        [HttpGet]
        public JsonResult GetDatabases()
        {
            return Json(ServiceFactory.DatabaseService.GetDatabases(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDatabasseList()
        {
            return Json(ServiceFactory.DatabaseService.GetDatabases(), JsonRequestBehavior.AllowGet);
        }
    }
}