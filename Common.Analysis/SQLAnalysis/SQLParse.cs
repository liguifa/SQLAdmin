using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Common.Analysis.SQLAnalysis
{
    public static class SQLParse
    {
        public static List<SQLNode> Parse(string sql)
        {
            string parseSQL = ConvertTosSimple(sql);
            List<SQLNode> parseResult = new List<SQLNode>();
            foreach (var config in  SQLParseRegex.Config)
            {
                List<string> matchs = GetMathchString(sql, config.Value);
                foreach (string match in matchs)
                {
                    SQLNode node = new SQLNode();
                    node.Name = config.Key.ToString();
                    node.Type = config.Key;
                    node.Text = match;
                    node.Parameters = match.Split(' ').ToList();
                    parseResult.Add(node);
                }
            }
            return parseResult;
        }

        private static string ConvertTosSimple(string sql)
        {
            string returnSQL = sql;
            returnSQL = returnSQL.ToLower();
            return returnSQL;
        }

        private static List<string> SplitSQL(string sql)
        {
            string regex = "(.*)";
            return GetMathchString(sql, regex);
        }

        private static List<string> GetMathchString(string inputString,string regexString)
        {
            Regex regex = new Regex(regexString);
            MatchCollection matchs = regex.Matches(inputString);
            List<string> returnMatchs = new List<string>();
            if(matchs != null)
            {
                foreach(Match match in matchs)
                {
                    returnMatchs.Add(match.Value);
                }
            }
            return returnMatchs;
        }
    }
}
