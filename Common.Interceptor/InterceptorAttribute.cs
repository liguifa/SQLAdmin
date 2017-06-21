using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Common.Interceptor
{
    public abstract class InterceptorAttribute : Attribute
    {
        /// <summary>
        /// 在方法被调用之前执行
        /// </summary>
        /// <param name="obj">调用方法的类</param>
        /// <param name="method">将要被调用的方法</param>
        /// <returns>前置方法是否执行通过</returns>
        public abstract bool PreHandler(object obj,MethodBase method);

        /// <summary>
        /// 在方法被调用之后执行
        /// </summary>
        /// <param name="obj">调用方法的类</param>
        /// <param name="method">将要被调用的方法</param>
        public abstract void PostHanler(object obj, MethodBase method);

        /// <summary>
        /// 当执行方法产生异常是执行
        /// </summary>
        /// <param name="obj">调用方法的类</param>
        /// <param name="method">将要被调用的方法</param>
        /// <param name="e">方法参数的异常</param>
        public abstract void ErrorHandler(object obj, MethodBase method, Exception e);
    }
}
