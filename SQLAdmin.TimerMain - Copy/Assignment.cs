using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MMS.TimerMain
{
    public abstract class Assignment
    {
        private readonly Timer mTimer;

        protected Assignment(TimeSpan timeSpan)
        {
            this.mTimer = new Timer(new TimerCallback(this.Execute), null, (long)timeSpan.TotalMilliseconds, (long)Timeout.Infinite);
        }

        public abstract void Execute(object e);
    }
}
