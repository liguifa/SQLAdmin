using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Command
{
    public class ShowDBCommand : Command
    {
        public override string GetArguments()
        {
            throw new NotImplementedException();
        }

        public override string GetExecCmd()
        {
            throw new NotImplementedException();
        }

        public override string GetCmd()
        {
            return "show dbs";
        }
    }
}
