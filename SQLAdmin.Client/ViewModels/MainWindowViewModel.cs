using MMS.UI.Common;
using MMS.UI.Default;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MMS.Client.ViewModels
{
    public class MainWindowViewModel : BaseINotifyPropertyChanged
    {
        private static MainWindowViewModel mMainWindow;
        private static readonly object syncRoot = new object();

        private MainWindowViewModel()
        {
            InitMenuItems();
        }

        public static MainWindowViewModel GetInstance()
        {
            if (mMainWindow == null)
            {
                lock (syncRoot)
                {
                    if (mMainWindow == null)
                    {
                        mMainWindow = new MainWindowViewModel();
                    }
                }
            }
            return mMainWindow;
        }

        private List<MenuItem> mMenuItems = new List<MenuItem>();
        public List<MenuItem> MenuItems { get { return this.mMenuItems; } set { this.mMenuItems = value; OnPropertyChanged("MenuItems"); } }

        private void InitMenuItems()
        {
            //设置菜单
            //文件菜单项
            MenuItem fileItem = new MenuItem() { Name = "文件", Icon = "", Children = new List<MenuItem>(), Command = new NewConnect() };
            fileItem.Children.Add(new MenuItem() { Name = "新建连接", Icon = "/Images/logo.ico", Command = new NewConnect() });
            fileItem.Children.Add(new MenuItem() { Name = "关闭连接", Icon = "/Images/new_connect.png", Command = new NewConnect() });
            this.MenuItems.Add(fileItem);
        }
    }

    public class NewConnect : ICommand
    {
        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            Connection connectWindow = new Connection();
            connectWindow.Show();
        }
    }
}
