using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace MMS.Installation
{
    public class ScanMongodButton : Button
    {
        public ScanMongodButton()
        {
            this.IsEnabled = true;
            this.ButtonVisiblity = Visibility.Visible;
            this.Text = "浏  览";
            this.Command = new ScanMongodCommand();
        }
    }

    public class ScanMongodCommand : ICommand
    {

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.ShowDialog();
            if (!("").Equals(openFileDialog.FileName))
            {
                MongoSetViewModel.GetInstance().MongodPath = openFileDialog.FileName;
            }
        }
    }
}
