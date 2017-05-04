using SQLAdmin.Domain;
using System.Collections.Generic;
using System.Data;

namespace SQLAdmin.Utility
{
    public static class AutoMapperHelper
    {
        public static T To<T>(this List<Database> databases) where T : class
        {
            //return Mapper.Map<T>(databases);
            DatabaseTree tree = new DatabaseTree();
            tree.Name = "(locahost:7793)-sa";
            tree.NodeType = DBTreeNodeType.Server;
            tree.Children = new List<DatabaseTree>();
            DatabaseTree dbTree = new DatabaseTree();
            dbTree.Name = "数据库";
            dbTree.NodeType = DBTreeNodeType.Docmenu;
            dbTree.Children = new List<DatabaseTree>();
            foreach (var db in databases)
            {
                DatabaseTree t = new DatabaseTree();
                t.Name = db.Name;
                t.NodeType = DBTreeNodeType.Docmenu;
                t.Children = new List<DatabaseTree>();
                if (db.Tables != null)
                {
                    foreach (var table in db.Tables)
                    {
                        DatabaseTree dt = new DatabaseTree();
                        dt.Name = table.Name;
                        dt.NodeType = DBTreeNodeType.List;
                        t.Children.Add(dt);
                    }
                }
                dbTree.Children.Add(t);
            }
            tree.Children.Add(dbTree);
            return tree as T;
        }

        public static T To<T>(this List<Table> tables) where T :class
        {
            return tables as T;
        }

        public static List<Dictionary<string,string>> To(this DataTable table)
        {
            List<Dictionary<string, string>> dataSet = new List<Dictionary<string, string>>();
            foreach(DataRow row in table.Rows)
            {
                Dictionary<string, string> dataRow = new Dictionary<string, string>();
                foreach (DataColumn column in table.Columns)
                {
                    dataRow.Add(column.ColumnName,row[column].ToString());
                }
                dataSet.Add(dataRow);
            }
            return dataSet;
        }
    }
}
