using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace MMS.Installation.Views
{
    /// <summary>
    /// InstallPath.xaml 的交互逻辑
    /// </summary>
    public partial class Process : Page
    {
        public Process()
        {
            InitializeComponent();
            this.Loaded += Process_Loaded;
            this.DataContext = ProcessViewModel.GetInstance();
        }

        void Process_Loaded(object sender, RoutedEventArgs e)
        {
            //开始安装
            InstallProcess install = new InstallProcess();
            install.Start();
        }
    }
}
