using MMS.UI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Installation
{
    public class MainWindowViewModel : BaseINotifyPropertyChanged
    {
        private static MainWindowViewModel mainWindow;
        private static readonly object syncRoot = new object();

        private MainWindowViewModel()
        {
            this.BackButton = new BackButton();
            this.NextButton = new NextButton();
            this.CancelButton = new CancelButton();
        }

        public static MainWindowViewModel GetInstance()
        {
            if (mainWindow == null)
            {
                lock (syncRoot)
                {
                    if (mainWindow == null)
                    {
                        mainWindow = new MainWindowViewModel();
                    }
                }
            }
            return mainWindow;
        }

        public BackButton BackButton { get; set; }
        public NextButton NextButton { get; set; }
        public CancelButton CancelButton { get; set; }

        private Navigation mNavigation = Navigation.GetInstance();
        public Navigation Navigation { get { return this.mNavigation; } set { this.mNavigation = value; } }
    }
}
