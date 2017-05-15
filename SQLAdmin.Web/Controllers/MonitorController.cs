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
    public class MonitorController : Controller
    {
        // GET: Monitor
        public ActionResult Index()
        {
            return View();
        }

        [Inject]
        public JsonResult GetMonitors()
        {
            return Json(ServiceFactory.GetInstance().MonitorService.GetAllSchedule(), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult AddMonitors(Schedule schedule)
        {
            return Json(ServiceFactory.GetInstance().MonitorService.AddSchedule(schedule), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult GetMonitorTypes()
        {
            return Json(ServiceFactory.GetInstance().MonitorService.GetMonitorTypes(), JsonRequestBehavior.AllowGet);
        }
    }
}