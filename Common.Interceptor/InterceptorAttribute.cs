using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Interceptor
{
    public abstract class InterceptorAttribute : Attribute
    {
        public abstract bool PreHandler();

        public abstract void PostHanler();

        public abstract void ErrorHandler();
    }
}
