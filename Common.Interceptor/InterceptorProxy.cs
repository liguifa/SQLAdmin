using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Runtime.Remoting.Proxies;
using System.Text;
using System.Threading.Tasks;

namespace Common.Interceptor
{
    public class InterceptorProxy:RealProxy
    {
        public object mProxyInstance;

        public InterceptorProxy(object proxyInstance)
        {
            this.mProxyInstance = proxyInstance;
        }

        public override IMessage Invoke(IMessage msg)
        {
            IMethodMessage methodMessage = msg as IMethodMessage;
            object[] interceptors = methodMessage.MethodBase.GetCustomAttributes(typeof(InterceptorAttribute), true);
            bool isPreExec = true;
            if(interceptors != null && interceptors.Any())
            {
                foreach(InterceptorAttribute interceptor in interceptors)
                {
                    if (isPreExec)
                    {
                        isPreExec = interceptor.PreHandler();
                    }
                    if(!isPreExec)
                    {
                        break;
                    }
                }
            }
            if(isPreExec)
            {
                methodMessage.MethodBase.Invoke(this.mProxyInstance, null);
            }
            if(isPreExec)
            {
                foreach (InterceptorAttribute interceptor in interceptors)
                {
                    interceptor.PostHanler();
                }
            }
            return null;
        }
    }
}
