using Common.Logger;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLAdmin.Web.App_Start;
using SQLAdmin.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace SQLAdmin.Web.Controllers
{
    public class DatabaseController : SQLAdminController
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        [HttpGet]
        [Inject]
        public JsonResult GetDatabases()
        {
            return Json(ServiceFactory.GetInstance().DatabaseService.GetDatabases(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Inject]
        public JsonResult GetDatabasseList()
        {
            mLog.Info("Start get databases.");
            return Json(ServiceFactory.GetInstance().DatabaseService.GetDatabases(), JsonRequestBehavior.AllowGet);
        }

        //[HttpGet]
        [Inject]
        public JsonResult GetTables(string databaseName)
        {
            mLog.Info("Start get tables.");
            return Json(ServiceFactory.GetInstance().DatabaseService.GetTables(databaseName), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult GetFieldTypes()
        {
            return Json(ServiceFactory.GetInstance().DatabaseService.GetFieldTypes(), JsonRequestBehavior.AllowGet);
        }

        [Inject]
        public JsonResult CreateTable(Table table)
        {
            return Json(ServiceFactory.GetInstance().DatabaseService.CreateTable(table), JsonRequestBehavior.AllowGet);
        }
    }
}