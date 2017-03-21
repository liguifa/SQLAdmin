using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Command
{
    public class ShowTableCommand : Command
    {
        public override string GetArguments()
        {
            throw new NotImplementedException();
        }

        public override string GetCmd()
        {
            return "show tables";
        }

        public override string GetExecCmd()
        {
            return "Show tables";
        }
    }
}
