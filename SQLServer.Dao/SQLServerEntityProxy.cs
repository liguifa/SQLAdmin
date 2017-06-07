using SQLAdmin.Dao;
using SQLServer.Domain.EntityProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Runtime.Remoting.Proxies;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Dao
{
    public class EntityProxy<T> : RealProxy where T : class
    {
        public object mProxyInstance;
        public IRepertory mRepertory;

        public EntityProxy(object proxyInstance, IRepertory repertory) : base(proxyInstance.GetType())
        {
            this.mProxyInstance = proxyInstance;
        }

        public override IMessage Invoke(IMessage msg)
        {
            IMethodCallMessage methodMessage = msg as IMethodCallMessage;
            NavPropertyAttribute navProperty = methodMessage.MethodBase.GetCustomAttributes(false).OfType<NavPropertyAttribute>().FirstOrDefault();
            object returnValue = null;
            if (navProperty == null)
            {
                returnValue = methodMessage.MethodBase.Invoke(this.mProxyInstance, methodMessage.Args);
            }
            else
            {
               
               // mRepertory.GetType().GetMethod("Find").MakeGenericMethod(methodMessage.)
            }
            return new ReturnMessage(returnValue, new object[0], 0, null, methodMessage);
        }
    }
}
