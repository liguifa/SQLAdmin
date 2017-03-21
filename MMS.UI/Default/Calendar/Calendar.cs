using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace MMS.UI.Default
{
    public class Calendar : System.Windows.Controls.Control
    {
        private ItemsControl mItemControl;
        private Border mCalendarChoose;
        private Image mCalendarBtn;

        public Calendar()
        {
            this.Style = (Style)Application.Current.Resources["CalendarStyle"];
            this.Loaded += Calendar_Loaded;
        }

        void Calendar_Loaded(object sender, RoutedEventArgs e)
        {
            List<ChooseTime> timeList = new List<ChooseTime>();
            DateTime start = this.GetStartDate();
            DateTime end = this.GetEndDate();
            for (int i = 0; start.AddDays(i) < end; i++)
            {
                ChooseTime day = new ChooseTime()
                {
                    Day = start.AddDays(i).Day.ToString("00")
                };
                timeList.Add(day);
            };
            this.mItemControl.ItemsSource = timeList;
            this.mCalendarBtn.MouseDown += mCalendarBtn_MouseDown;
        }

        void mCalendarBtn_MouseDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            if(this.mCalendarChoose.Visibility == System.Windows.Visibility.Visible)
            {
                this.mCalendarChoose.Visibility = System.Windows.Visibility.Collapsed;
            }
            else
            {
                this.mCalendarChoose.Visibility = System.Windows.Visibility.Visible;
            }
        }

        private DateTime GetStartDate()
        {
            switch (new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).DayOfWeek)
            {
                case DayOfWeek.Friday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-5);
                    }
                case DayOfWeek.Monday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-1);
                    }
                case DayOfWeek.Saturday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-6);
                    }
                case DayOfWeek.Sunday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-0);
                    }
                case DayOfWeek.Thursday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-4);
                    }
                case DayOfWeek.Tuesday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-2);
                    }
                case DayOfWeek.Wednesday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddDays((double)-3);
                    }
                default:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    }
            }
        }

        private DateTime GetEndDate()
        {
            switch (new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).DayOfWeek)
            {
                case DayOfWeek.Friday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)2);
                    }
                case DayOfWeek.Monday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)5);
                    }
                case DayOfWeek.Saturday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)1);
                    }
                case DayOfWeek.Sunday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)0);
                    }
                case DayOfWeek.Thursday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)3);
                    }
                case DayOfWeek.Tuesday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)6);
                    }
                case DayOfWeek.Wednesday:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1).AddDays((double)4);
                    }
                default:
                    {
                        return new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1);
                    }
            }
        }

        public override void OnApplyTemplate()
        {
            this.mItemControl = (ItemsControl)this.GetTemplateChild("timeBox");
            this.mCalendarChoose = (Border)this.GetTemplateChild("calendarChoose");
            this.mCalendarBtn = (Image)this.GetTemplateChild("calendarBtn");
            base.OnApplyTemplate();
        }
    }

    public class ChooseTime
    {
        public string Day { get; set; }
    }
}
