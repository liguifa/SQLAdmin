using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace MMS.UnInstallation
{
    public class NextButton : Button
    {
        public NextButton()
        {
            this.Text = "下一步";
            this.IsEnabled = false;
            this.ButtonVisiblity = Visibility.Visible;
            this.Command = new NextCommand();
        }
    }

    public class NextCommand : ICommand
    {
        public delegate bool CheckCanEnabled();

        public event CheckCanEnabled IsCanEnabled;

        public bool CanExecute(object parameter)
        {
            try
            {
                return this.IsCanEnabled();
            }
            catch (Exception e)
            {
                return true;
            }
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            Navigation.GetInstance().Next();
        }
    }

    public class FinishCommand : ICommand
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
