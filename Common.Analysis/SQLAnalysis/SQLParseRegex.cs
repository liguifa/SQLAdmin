using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Analysis.SQLAnalysis
{
    public static class SQLParseRegex
    {
        private static readonly Dictionary<SQLNodeType, string> mRegex = new Dictionary<SQLNodeType, string>()
        {
            {SQLNodeType.SELECT,"select .+ from" },
            {SQLNodeType.ORDERBY,"order by .+" }
        };

        public static Dictionary<SQLNodeType, string> Config { get { return mRegex; } }
    }
}
