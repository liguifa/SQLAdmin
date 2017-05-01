using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SQLServer.Utility.Constant;

namespace SQLServer.Dao
{
    public class SQLQuery
    {
        private List<string> mQueryKeys = new List<string>();

        public SQLQuery()
        {
        }

        public SQLQuery Select(string cols)
        {
            this.mQueryKeys.Insert(0, cols);
            this.mQueryKeys.Insert(0, SELECT);
            return this;
        }

        public SQLQuery From(string table)
        {
            this.mQueryKeys.Add(FORM);
            this.mQueryKeys.Add(table);
            return this;
        }

        public SQLQuery OrderBy(string col, bool isAsc = false)
        {
            this.mQueryKeys.Add(ORDERBY);
            this.mQueryKeys.Add(col);
            if (isAsc)
            {
                this.mQueryKeys.Add(ESC);
            }
            else
            {
                this.mQueryKeys.Add(DESC);
            }
            return this;
        }

        public SQLQuery Create(string tableName)
        {
            this.mQueryKeys.Insert(0, tableName);
            this.mQueryKeys.Insert(0, CREATE);
            return this;
        }

        public SQLQuery Table()
        {
            this.mQueryKeys.Add(TABLE);
            return this;
        }

        public string Qenerate()
        {
            return String.Join(" ", this.mQueryKeys.ToArray());
        }
    }
}
