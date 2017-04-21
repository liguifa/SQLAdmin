using Common.Utility;
using MMS.Config;
using MMS.Config.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public static class DatabaseTypeHelper
    {
        private static readonly object mSyncroot = new object();
        public static List<DatabaseType> GetDatabseTypes()
        {
            lock(mSyncroot)
            {
                using (Config<DatabaseType> config = new Config<DatabaseType>(ActionType.Write))
                {
                    if (!config.IsExist())
                    {
                        List<DatabaseType> menus = SerializerHelper.DeserializeObjectFormFile<List<DatabaseType>>(Constant.DATABASE_CONFIG_FILE);
                        config.Create(menus);
                    }
                    return config.GetAll();
                }
            }
        }

        public static DatabaseType GetDatabaseTypeByType(long type)
        {
            var databaseTypes = GetDatabseTypes();
            return databaseTypes.Where(d => d.Type == type).FirstOrDefault();
        }
    }
}
