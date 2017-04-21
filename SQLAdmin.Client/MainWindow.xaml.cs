using MMS.Client.ViewModels;
using MMS.Grammar;
using MMS.MongoDB;
using MMS.UI.Default;
using SQLAdmin.Domain;
using SQLAdmin.Domain;
using SQLAdmin.IService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Linq;

namespace MMS.Client
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : MMS.UI.Default.Window
    {
        private GrammarAnalysis ga = new GrammarAnalysis();

        public MainWindow()
        {
            InitializeComponent();
            this.Loaded += MainWindow_Loaded;
        }

        void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            this.menu.MenuItems = MainWindowViewModel.GetInstance().MenuItems;
            Connection window = new Connection();
            window.OKButton_Click += ConnectDB;
            window.ShowDialog();
        }

        private void ConnectDB(string type, string address, string port, string username, string password)
        {
            try
            {
                DBConnect setting = new DBConnect()
                {
                    Address = address,
                    Port = Convert.ToInt32(port),
                    Password = password,
                    Userename = username
                };
                if (type == "MongoDB")
                {
                    ServiceFactory.DBConnectService.Connect(setting);
                    GetDatabases(setting);
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }

        private async void GetDatabases(DBConnect setting)
        {
            DatabaseTree dbTree = ServiceFactory.DatabaseService.GetDatabases();
            List<ExplorerItem> items = new List<ExplorerItem>();
            items.Add(this.ParseMongoDBTree(dbTree));
            this.explorer.UpdateSource(items);
        }

        public ExplorerItem ParseMongoDBTree(DatabaseTree dbTree)
        {
            ExplorerItem m = new ExplorerItem();
            m.Text = dbTree.Name;
            m.Type = (ExplorerItemType)((int)dbTree.NodeType);
            m.ContextMenu = MMS.Client.ContextMenu.ServerContextMenu;
            if (dbTree.Children != null && dbTree.Children.Count > 0)
            {
                m.Children = new List<ExplorerItem>();
                foreach (var t in dbTree.Children)
                {
                    m.Children.Add(this.ParseMongoDBTree(t));
                }
            }
            return m;
        }
    }
}
