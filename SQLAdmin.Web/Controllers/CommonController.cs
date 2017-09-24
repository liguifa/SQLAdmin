using Common.Utility;
using SQLAdmin.Utility;
using SQLAdmin.Web.Convert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class CommonController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Connect()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetMenus()
        {
            return Json(MenuHelper.GetMenus().ToViewModel(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetDatabaseTypes()
        {
            return Json(DatabaseTypeHelper.GetDatabseTypes(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult About()
        {
            return PartialView();
        }

        [HttpGet]
        public ActionResult  ManagePool()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Explorer()
        {
            return View();
        }
    }
}