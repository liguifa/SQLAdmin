using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using SQLAdmin.Utility;
using SQLAdmin.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public class ServiceFactory
    {
        private static UnityContainer mContainer = new UnityContainer();
        protected static Dictionary<int, ServiceFactory> mServiceFactoryPool = new Dictionary<int, ServiceFactory>();
        private ParameterOverrides mParameter = new ParameterOverrides();

        private ServiceFactory(string container, DBConnect dbConnect)
        {
            var configuration = System.Configuration.ConfigurationManager.GetSection(UnityConfigurationSection.SectionName) as UnityConfigurationSection;
            configuration.Configure(mContainer, container);
            this.mParameter.Add("dbConnect", dbConnect);
        }

        public static void Register(long type, DBConnect dbConnect)
        {
            int theadId = Thread.CurrentThread.ManagedThreadId;
            if (!mServiceFactoryPool.Keys.Contains(theadId))
            {
                var databaseType = DatabaseTypeHelper.GetDatabaseTypeByType(type);
                var serviceFactory = new ServiceFactory(databaseType.Container, dbConnect);
                mServiceFactoryPool.Add(theadId, serviceFactory);
            }
        }

        public static void UnRegister()
        {
            int theadId = Thread.CurrentThread.ManagedThreadId;
            if (mServiceFactoryPool.Keys.Contains(theadId))
            {
                mServiceFactoryPool.Remove(theadId);
            }
        }

        public static ServiceFactory GetInstance()
        {
            int theadId = Thread.CurrentThread.ManagedThreadId;
            if(mServiceFactoryPool.Keys.Contains(theadId))
            {
                return mServiceFactoryPool[theadId];
            }
            return null;
        }

        public  IDBConnectService DBConnectService { get { return mContainer.Resolve<IDBConnectService>(this.mParameter); } }

        public IDatabaseService DatabaseService { get { return mContainer.Resolve<IDatabaseService>(this.mParameter); } }
    }
}
