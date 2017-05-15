using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class DateTimeHelper
    {
        public static long ConvertToUtc(long ticks)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return ticks * 10000 + origin.Ticks;
        }

        public static long ConvertFormUtc(long ticks)
        {
            long origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).Ticks;
            return (ticks - origin) / 10000;
        }
    }
}
