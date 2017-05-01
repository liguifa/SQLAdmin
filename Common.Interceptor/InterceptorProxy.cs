using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Runtime.Remoting.Proxies;
using System.Text;
using System.Threading.Tasks;

namespace Common.Interceptor
{
    public class InterceptorProxy<T> : RealProxy where T : class
    {
        public object mProxyInstance;

        public InterceptorProxy(object proxyInstance) : base(proxyInstance.GetType())
        {
            this.mProxyInstance = proxyInstance;
        }

        public override IMessage Invoke(IMessage msg)
        {
            IMethodCallMessage methodMessage = msg as IMethodCallMessage;
            object[] interceptors = methodMessage.MethodBase.GetCustomAttributes(typeof(InterceptorAttribute), true);
            bool isPreExec = true;
            object returnValue = null;
            if (interceptors != null && interceptors.Any())
            {
                foreach (InterceptorAttribute interceptor in interceptors)
                {
                    if (isPreExec)
                    {
                        isPreExec = interceptor.PreHandler();
                    }
                    if (!isPreExec)
                    {
                        break;
                    }
                }
            }
            if (isPreExec)
            {
                returnValue = methodMessage.MethodBase.Invoke(this.mProxyInstance, methodMessage.Args);
            }
            if (isPreExec)
            {
                foreach (InterceptorAttribute interceptor in interceptors)
                {
                    interceptor.PostHanler();
                }
            }
            return new ReturnMessage(returnValue, new object[0], 0, null, methodMessage);
        }
    }
}
