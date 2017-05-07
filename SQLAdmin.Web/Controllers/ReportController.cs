using SQLAdmin.IService;
using SQLAdmin.Web.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class ReportController : SQLAdminController
    {
        #region View
        public ActionResult Cpu()
        {
            return View();
        }

        public ActionResult Memory()
        {
            return View();
        }

        public ActionResult HardDisk()
        {
            return View();
        }

        public ActionResult DataQuantity()
        {
            return View();
        }
        public ActionResult backups()
        {
            return View();
        }

        public ActionResult Query()
        {
            return View();
        }

        public ActionResult Connect()
        {
            return View();
        }
        #endregion

        #region DATA
        [Inject]
        public JsonResult GetCPUInfos()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetCPUInfos(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}