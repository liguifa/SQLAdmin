using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Analysis.SQLAnalysis
{
    public class SQLNode
    {
        public string Text { get; set; }

        public string Name { get; set; }

        public List<string> Parameters { get; set; }

        public SQLNodeType Type { get; set; }

        public List<SQLNode> Children { get; set; }
    }

    public enum SQLNodeType
    {
        SELECT,
        DELETE,
        UPDATE,
        SET,
        FORM,
        WHERE,
        ORDERBY,
        INSET
    }
}
