using SQLAdmin.Domain;
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
        public ActionResult Cpu(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }

        public ActionResult Memory(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }

        public ActionResult HardDisk(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }

        public ActionResult DataQuantity(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }
        public ActionResult backups(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }

        public ActionResult Query(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }

        public ActionResult Connect(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
            return View();
        }

        public ActionResult Exception(int defaultPageId)
        {
            ViewBag.DefaultPageId = defaultPageId;
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

        [Inject]
        public JsonResult GetQueryHistories(DataFilter filter)
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetQueryHistories(filter), JsonRequestBehavior.AllowGet);
        }

        [Inject] 
        public JsonResult GetAllQueryProportionInfo()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetAllQueryProportionInfo(), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult GetMemoryInfos()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetMemoryInfos(), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult GetDiskInfos()
        {
            return Json(ServiceFactory.GetInstance().DBReportService.GetDiskInfos(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}