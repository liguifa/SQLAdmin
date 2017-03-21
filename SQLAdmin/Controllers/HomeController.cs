using SQLAdmin.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Connect()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetNavigations()
        {
            return Json(NavigationHelper.GetNavigations(), JsonRequestBehavior.AllowGet);
        }
    }
}