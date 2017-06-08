using SQLAdmin.Domain;
using SQLAdmin.Utility;
using SQLAdmin.Utility.ViewModels;
using SQLServer.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Utility
{
    public static class ConvertHerlper
    {
        public static List<QueryHistoryInfoViewModel> ToViewModel(this List<QueryHistory> entities)
        {
            List<QueryHistoryInfoViewModel> viewmodels = new List<QueryHistoryInfoViewModel>();
            if(entities!=null)
            {
                foreach(QueryHistory entity in entities)
                {
                    QueryHistoryInfoViewModel viewmodel = new QueryHistoryInfoViewModel();
                    viewmodel.LastCPUTime = entity.LastCPUTime;
                    viewmodel.LastExecuteTime = entity.LastExecuteTime;
                    viewmodel.LastExecutionTime = entity.LastExecutionTime.ToLocalTime().ToString();
                    viewmodel.LastReturnRows = entity.LastReturnRows;
                    viewmodel.MaxCPUTime = entity.MaxCPUTime;
                    viewmodel.MaxExecuteTime = entity.MaxExecuteTime;
                    viewmodel.MaxReturnRows = entity.MaxReturnRows;
                    viewmodel.MinCPUTime = entity.MinCPUTime;
                    viewmodel.MinExecuteTime = entity.MinExecuteTime;
                    viewmodel.MinReturnRows = entity.MinReturnRows;
                    viewmodel.Text = entity.Text;
                    viewmodels.Add(viewmodel);
                }
            }
            return viewmodels;
        }

        public static DatabaseTreeViewModel ToViewModel(this List<Database> entities, DBConnect dbConnect,List<Product> produects)
        {
            DatabaseTreeViewModel databaseTree = new DatabaseTreeViewModel();
            if (entities != null)
            {
                string productName = produects.FirstOrDefault(d => d.Name.Equals("ProductName"))?.Value.ToString();
                string productVersion = produects.FirstOrDefault(d => d.Name.Equals("ProductVersion"))?.Value.ToString();
                databaseTree.Name = $"{dbConnect.Address}({productName} {productVersion} - {dbConnect.Userename})";
                databaseTree.NodeType = DBTreeNodeType.Server;
                databaseTree.Children = new List<DatabaseTreeViewModel>();
                DatabaseTreeViewModel dbTree = new DatabaseTreeViewModel();
                dbTree.Name = "数据库";
                dbTree.NodeType = DBTreeNodeType.Docmenu;
                dbTree.Children = new List<DatabaseTreeViewModel>();
                foreach (var db in entities)
                {
                    DatabaseTreeViewModel t = new DatabaseTreeViewModel();
                    t.Name = db.Name;
                    t.NodeType = DBTreeNodeType.Docmenu;
                    t.Children = new List<DatabaseTreeViewModel>();
                    dbTree.Children.Add(t);
                }
                databaseTree.Children.Add(dbTree);
            }
            return databaseTree;
        }

        public static List<FieldTypeViewModel> ToViewModel(this List<Domain.FieldType> entities)
        {
            List<FieldTypeViewModel> fields = new List<FieldTypeViewModel>();
            if(entities != null)
            {
                foreach(var entity in entities)
                {
                    FieldTypeViewModel field = new FieldTypeViewModel();
                    field.DisplayName = entity.DisplayName;
                    field.IsNullable = entity.IsNullable;
                    field.MaxLength = entity.MaxLength;
                    field.Type = FieldTypeHelper.GetFieldTypeBySQLServerTypeId(entity.);
                    fields.Add(field);
                }
            }
            return fields;
        }

        public static List<FieldViewModel> ToViewModel(this List<Field> entities)
        {
            List<FieldViewModel> fields = new List<FieldViewModel>();
            if(entities != null)
            {
                foreach(Field entity in entities)
                {
                    FieldViewModel field = new FieldViewModel();
                    field.Id = entity.Id;
                    field.Name = entity.Name;
                    field.Type =
                    fields.Add(field);
                }
            }
            return fields;
        }

        public static List<IndexViewModel> ToViewModel(this List<Index> entities)
        {
            List<IndexViewModel> indexs = new List<IndexViewModel>();
            if(entities != null)
            {
                foreach(Index entity in entities)
                {
                    IndexViewModel index = new IndexViewModel();
                    index.Id = entity.Id;
                    index.ColumnName = entity.ColumnName;
                    index.IndexName = entity.IndexName;
                    index.Type = entity.Id == 1 ? IndexType.Primary : IndexType.Foreign;
                    indexs.Add(index);
                }
            }
            return indexs;
        }

        public static List<TableViewModel> ToViewModel(this List<Table> entities,string databaseName)
        {
            List<TableViewModel> tables = new List<TableViewModel>();
            if(entities != null)
            {
                foreach(Table entity in entities)
                {
                    TableViewModel table = new TableViewModel();
                    table.Id = entity.Id.ToString();
                    table.Name = entity.Name;
                    table.Fullname = $"[{databaseName}].[dbo].[{entity.Name}]";
                    tables.Add(table);
                }
            }
            return tables;
        }

        public static List<DiskViewModel> ToViewModel(this List<Disk> disks)
        {
            List<DiskViewModel> viewmodes = new List<DiskViewModel>();
            DiskViewModel allDisk = new DiskViewModel();
            allDisk.FreeSpace = disks.Sum(d => d.AvailableSpace);
            allDisk.TotalSpace = disks.Sum(d => d.TotalSpace);
            allDisk.UsedSpace = allDisk.TotalSpace - allDisk.FreeSpace;
            allDisk.FreeSpacePercent = (double)allDisk.FreeSpace / allDisk.TotalSpace;
            allDisk.DatabaseName = "Server";
            viewmodes.Add(allDisk);
            List<IGrouping<long,Disk>> databaseGroup = disks.GroupBy(d => d.DatabaseId).ToList();
            foreach (var database in databaseGroup)
            {
                DiskViewModel databaseDisk = new DiskViewModel();
                databaseDisk.DatabaseName = database.FirstOrDefault()?.DatabaseName;
                databaseDisk.DriveName = database.FirstOrDefault()?.VolumeMountPoint;
                databaseDisk.FreeSpace = database.Sum(d => d.AvailableSpace);
                databaseDisk.TotalSpace = database.Sum(d => d.TotalSpace);
                databaseDisk.UsedSpace = databaseDisk.TotalSpace - databaseDisk.FreeSpace;
                databaseDisk.FreeSpacePercent = (double)databaseDisk.FreeSpace / databaseDisk.TotalSpace;
                viewmodes.Add(databaseDisk);
            }
            return viewmodes;
        }

        public static TableDataViewMdoel ToViewModel(this List<dynamic> entities, List<FieldViewModel> fileds)
        {
            TableDataViewMdoel vm = new TableDataViewMdoel();
            vm.Datas = entities;
            foreach (var data in vm.Datas)
            {
                foreach (var field in fileds)
                {
                    if (data[field.Name] != null)
                    {
                        data[field.Name] = new { Value = data[field.Name], Type = field.Type };
                    }
                }
            }
            return vm;
        }
    }
}
