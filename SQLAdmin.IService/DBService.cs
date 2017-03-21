using Common.Logger;
using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public class DBService
    {
        protected static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);
        protected DBConnect mDBConnect { get; private set; }

        public DBService(DBConnect dbConnect)
        {
            this.mDBConnect = dbConnect;
        }
    }
}
