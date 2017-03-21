using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using MMS.UI.Common;
using MMS.MongoDB;
using MMS.UI.Default;
using System.Windows;

namespace MMS.Client
{
    public static class ContextMenu
    {
        public static List<ContextMenuItem> ServerContextMenu
        {
            get
            {
                List<ContextMenuItem> menus = new List<ContextMenuItem>();
                ContextMenuItem refresh = new ContextMenuItem()
                {
                    Text = "刷新",
                    Command = new ServerCommand()
                };
                ContextMenuItem disConnect = new ContextMenuItem()
                {
                    Text = "断开连接",
                    Command = new ServerCommand()
                };
                ContextMenuItem newDatabase = new ContextMenuItem()
                {
                    Text = "新建数据库",
                    Command = new NewDatabase()
                };
                menus.Add(refresh);
                menus.Add(disConnect);
                menus.Add(newDatabase);
                return menus;
            }
        }

        public static List<ContextMenuItem> DocumenuContextMenu
        {
            get
            {
                List<ContextMenuItem> menus = new List<ContextMenuItem>();
                ContextMenuItem delDatabase = new ContextMenuItem()
                {
                    Text = "删除",
                    Command = new DelDatabase()
                };
                ContextMenuItem newCollection = new ContextMenuItem()
                {
                    Text = "新建集合",
                    Command = new NewCollection()
                };
                menus.Add(delDatabase);
                menus.Add(newCollection);
                return menus;
            }
        }

        public static List<ContextMenuItem> CollectionContextMenu
        {
            get
            {
                List<ContextMenuItem> menus = new List<ContextMenuItem>();
                ContextMenuItem delCollection = new ContextMenuItem()
                {
                    Text = "删除",
                    Command = new DelCollection()
                };
                ContextMenuItem scan = new ContextMenuItem()
                {
                    Text = "显示全部数据",
                    Command = new DelCollection()
                };
                menus.Add(delCollection);
                menus.Add(scan);
                return menus;
            }
        }
    }

    public class ServerCommand : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            MessageBox.Show("test");
        }
    }

    public class DisConnectCommand : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {

        }
    }

    public class NewDatabase : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            //MongoDBManager.GetInstance().CreateDatabase("ttt");
        }
    }

    public class DelDatabase : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {

        }
    }

    public class NewCollection : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {

        }
    }

    public class DelCollection : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            
        }
    }

    public class Scan:ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            
        }
    }
}
