using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;

namespace MMS.Installation
{
    public class ScanInstallButton : Button
    {
        public ScanInstallButton()
        {
            this.IsEnabled = true;
            this.ButtonVisiblity = Visibility.Visible;
            this.Text = "浏  览";
            this.Command = new ScanInstallCommand();
        }
    }

    public class ScanInstallCommand : ICommand
    {

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            FolderBrowserDialog folderBrowserDialog = new FolderBrowserDialog();
            folderBrowserDialog.ShowDialog();
            if (!("").Equals(folderBrowserDialog.SelectedPath))
            {
                InstallPathViewModel.GetInstance().InstallPath = folderBrowserDialog.SelectedPath;
            }
        }
    }
}
