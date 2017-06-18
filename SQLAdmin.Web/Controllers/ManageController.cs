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
    public class ManageController : SQLAdminController
    {
        // GET: Manage
        public ActionResult Query(string name)
        {
            ViewBag.Name = name;
            return View();
        }

        [HttpPost]
        [Inject]
        public JsonResult Get(DataFilter filter)
        {
            return Json(ServiceFactory.GetInstance().DBManageService.Select(filter), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Inject]
        public JsonResult Delete(RemoveFilter filter)
        {
            return Json(ServiceFactory.GetInstance().DBManageService.Delete(filter), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Inject]
        public JsonResult Update(UpdateFilter filter)
        {
            return Json(ServiceFactory.GetInstance().DBManageService.Update(filter), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Inject]
        public JsonResult Find()
        {
            return null;
        }

        [HttpPost]
        [Inject]
        public JsonResult ExecSQL(string sql)
        {
            return null;
        }

    }
}