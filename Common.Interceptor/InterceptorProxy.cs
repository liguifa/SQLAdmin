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
            IMethodCallMessage methodMessuige = msg as IMethodCallMessage;
            List<InterceptorAttribute> interceptors = methodMessuige.MethodBase.GetCustomAttributes(true).OfType<InterceptorAttribute>().ToList();
            try
            {
                bool isPreExec = true;
                object returnValue = null;
                if (interceptors != null && interceptors.Any())
                {
                    foreach (InterceptorAttribute interceptor in interceptors)
                    {
                        if (isPreExec)
                        {
                            isPreExec = interceptor.PreHandler(this.mProxyInstance, methodMessuige.MethodBase);
                        }
                        if (!isPreExec)
                        {
                            break;
                        }
                    }
                }
                if (isPreExec)
                {
                    returnValue = methodMessuige.MethodBase.Invoke(this.mProxyInstance, methodMessuige.Args);
                }
                if (isPreExec)
                {
                    foreach (InterceptorAttribute interceptor in interceptors)
                    {
                        interceptor.PostHanler(this.mProxyInstance, methodMessuige.MethodBase);
                    }
                }
                return new ReturnMessage(returnValue, new object[0], 0, null, methodMessuige);
            }
            catch(Exception e)
            {
                foreach(var interceptor in interceptors)
                {
                    interceptor.ErrorHandler(this.mProxyInstance, methodMessuige.MethodBase, e);
                }
                throw;
            }
        }
    }
}
