using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public static class ServiceFactory
    {
        private static UnityContainer mContainer = new UnityContainer();

        static ServiceFactory()
        {
            var configuration = System.Configuration.ConfigurationManager.GetSection(UnityConfigurationSection.SectionName) as UnityConfigurationSection;
            configuration.Configure(mContainer, "defaultContainer");
        }

        public static IDBConnectService DBConnectService { get { return mContainer.Resolve<IDBConnectService>(); } }

        public static IDatabaseService DatabaseService { get { return mContainer.Resolve<IDatabaseService>(); } }
    }
}
