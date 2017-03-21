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
    /// License.xaml 的交互逻辑
    /// </summary>
    public partial class License : Page
    {
        public License()
        {
            InitializeComponent();
            this.DataContext = LicenseViewModel.GetInstance();
            MainWindowViewModel.GetInstance().BackButton.ButtonVisiblity = System.Windows.Visibility.Hidden;
        }

        private void CheckBox_Checked(object sender, RoutedEventArgs e)
        {
            MainWindowViewModel.GetInstance().NextButton.IsEnabled = true;
        }

        private void CheckBox_Unchecked(object sender, RoutedEventArgs e)
        {
            MainWindowViewModel.GetInstance().NextButton.IsEnabled = false;
        }
    }
}
