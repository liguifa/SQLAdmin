using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Interceptor
{
    public static class InterceptorFactory
    {
        public static T GetInstance<T>(object interceptorInstance)
        {
            InterceptorProxy interceptor = new InterceptorProxy(interceptorInstance);
            return (T)interceptor.GetTransparentProxy();
        }
    }
}
