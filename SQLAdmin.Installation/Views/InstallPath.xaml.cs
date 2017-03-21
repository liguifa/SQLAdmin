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
    public partial class InstallPath : Page
    {
        public InstallPath()
        {
            InitializeComponent();
            this.DataContext = InstallPathViewModel.GetInstance();
            ((NextCommand)(MainWindowViewModel.GetInstance().NextButton.Command)).IsCanEnabled += InstallPath_IsCanEnabled;
        }

        private bool InstallPath_IsCanEnabled()
        {
            return !String.IsNullOrEmpty(InstallPathViewModel.GetInstance().InstallPath);
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            MainWindowViewModel.GetInstance().NextButton.IsEnabled = !String.IsNullOrEmpty(InstallPathViewModel.GetInstance().InstallPath);
        }
    }
}
