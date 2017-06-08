using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility
{
    public class FieldTypeViewModel
    {
        public string DisplayName { get; set; }

        public int MaxLength { get; set; }

        public int IsNullable { get; set; }

        public FieldType Type { get; set; }
    }

    public enum FieldType
    {
        Text,
        Image,
        Guid,
        Date,
        DateTime,
        Number,
        Money,
        Float,
        Bool,
        Binary,
        Char,
        Time,
        Xml,
        Tree,
        Datagrid,
        Json
    }
}
