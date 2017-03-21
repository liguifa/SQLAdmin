using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Command
{
    public class RunShellCommand:Command
    {
        public override string GetExecCmd()
        {
            return @"C:\Program Files\Mongo\bin\Mongo.exe";
        }

        public override string GetArguments()
        {
            return "";
        }

        public override string GetCmd()
        {
            return @"C:\Program Files\Mongo\bin\Mongo.exe";
        }
    }
}
