using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Utility.ViewModels
{
    public class ExecViewModel
    {
        public string Code { get; set; }

        public Language Language { get; set; }

        public string Result { get; set; }

        public ResultType ResultType { get; set; }
    }

    public enum Language
    {
        TSQL,
        JavaScript
    }

    public enum ResultType
    {
        Data,
        Error,
        Message
    }
}
