using AutoMapper;
using MSQLAdmin.Domain;
using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MongoDB.Service
{
    public static class AutoMapperHelper
    {
        static AutoMapperHelper()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Database, DatabaseTree>());
        }

        public static T To<T>(this List<Database> databases) where T : class
        {
            //return Mapper.Map<T>(databases);
            DatabaseTree tree = new DatabaseTree();
            tree.Name = "(locahost:7793)-sa";
            tree.NodeType = DBTreeNodeType.Server;
            tree.Children = new List<DatabaseTree>();
            foreach(var db in databases)
            {
                DatabaseTree t = new DatabaseTree();
                t.Name = db.Name;
                t.NodeType = DBTreeNodeType.Docmenu;
                t.Children = new List<DatabaseTree>();
                foreach(var table in db.Tables)
                {
                    DatabaseTree dt = new DatabaseTree();
                    dt.Name = table.Name;
                    dt.NodeType = DBTreeNodeType.List;
                    t.Children.Add(dt);
                }
                tree.Children.Add(t);
            }
            return tree as T;
        }
    }
}
