using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Interceptor
{
    public static class InterceptorFactory
    {
        public static T GetInstance<T>(object interceptorInstance) where T : class
        {
            InterceptorProxy<T> interceptor = new InterceptorProxy<T>(interceptorInstance);
            return (T)interceptor.GetTransparentProxy();
        }
    }
}
