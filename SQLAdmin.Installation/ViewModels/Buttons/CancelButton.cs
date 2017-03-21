using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace MMS.Installation
{
    public class CancelButton : MMS.Installation.Button
    {
        public CancelButton()
        {
            this.Text = "取消";
            this.IsEnabled = true;
            this.ButtonVisiblity = Visibility.Visible;
            this.Command = new CancelCommand();
        }
    }

    public class CancelCommand : ICommand
    {

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            Application.Current.Shutdown();
        }
    }
}
