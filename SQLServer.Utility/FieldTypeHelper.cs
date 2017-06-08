using MMS.Config;
using SQLAdmin.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Utility
{
    public static class FieldTypeHelper
    {
        public static FieldType GetFieldTypeBySQLServerTypeId(int typeId)
        {
            Config<TypeMapping> config = new Config<TypeMapping>();
            List<TypeMapping> mappings = config.GetAll();
            var type = mappings.FirstOrDefault(d => d.SQLServerTypeId == typeId);
            return type == null ? FieldType.Text : (FieldType)type.ViewTypeId;
        }
    }

    public class TypeMapping
    {
        public int SQLServerTypeId { get; set; }

        public int ViewTypeId { get; set; }
    }
}
