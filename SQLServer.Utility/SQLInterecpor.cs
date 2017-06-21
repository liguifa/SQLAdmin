using Common.Interceptor;
using Common.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Utility
{
    public class SQLInterecpor : InterceptorAttribute
    {
        private static readonly Logger mLog = Logger.GetInstance(MethodBase.GetCurrentMethod().DeclaringType);

        public override bool PreHandler(object obj, MethodBase method)
        {
            mLog.Info($"Start exec {obj.GetType()}.{method}.");
            return true;
        }

        public override void PostHanler(object obj, MethodBase method)
        {
            mLog.Info($"Exec {obj.GetType()}.{method} end.");
        }

        public override void ErrorHandler(object obj, MethodBase method, Exception e)
        {
            mLog.Error($"An error has occurred in the {obj.GetType()}.{method},error:{e.ToString()}");
        }
    }
}
