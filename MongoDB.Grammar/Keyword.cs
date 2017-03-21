using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MMS.Grammar
{
    public static class Keyword
    {
        private static List<Regex> mRegex = new List<Regex>()
        {
            new Regex("function"),
            new Regex("var"),
            new Regex("find"),
            new Regex("insert"),
            new Regex("remove"),
            new Regex("public"),
            new Regex("FlowDocument"),
            new Regex("Edit"),
            new Regex("Paragraph"),
            new Regex("Run"),
            new Regex("is"),
            new Regex("if"),
            new Regex("for"),
            new Regex("int"),
            new Regex("new"),
            new Regex("Keyboard"),
        };

        public static bool IsKeyword(string str)
        {
            bool isKeyword = false;
            Parallel.ForEach(mRegex, regex =>
            {
                if (regex.Match(str).Value.Equals(str))
                {
                    isKeyword = true;
                }
            });
            return isKeyword;
        }
    }
}
