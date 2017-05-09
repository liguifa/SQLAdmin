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

        public ActionResult Exception()
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

        [Inject]
        public JsonResult GetConnectedSummary()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetConnectedSummary(), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult GetConnectedInfos()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetConnectedInfos(),JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult GetExceptionInfos()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetExceptionInfos(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}