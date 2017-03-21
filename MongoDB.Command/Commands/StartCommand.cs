using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Command
{
    public class StartCommand : Command
    {
        public override string GetArguments()
        {
            return "";
        }

        public override string GetCmd()
        {
            throw new NotImplementedException();
        }

        public override string GetExecCmd()
        {
            return @"C:\Program Files\Mongo\bin\Mongod.exe";
        }
    }
}
