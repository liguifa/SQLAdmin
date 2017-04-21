using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class ManageController : Controller
    {
        // GET: Manage
        public ActionResult Query()
        {
            return View();
        }
    }
}