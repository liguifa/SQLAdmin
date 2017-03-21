using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Command
{
    public abstract class Command
    {
        public CommandParameter Parameter { get; set; }

        public abstract string GetExecCmd();

        public abstract string GetArguments();

        public abstract string GetCmd();
    }

    public class CommandParameter
    {
        private Dictionary<string, string> mParameter = new Dictionary<string, string>();

        public string this[string key]
        {
            get
            {
                string value = String.Empty;
                Parallel.ForEach(mParameter, parameter =>
                {
                    if (parameter.Key.Equals(key.ToLower()))
                    {
                        value = parameter.Value;
                    }
                });
                return value;
            }
        }

        public void Add(string key, string value)
        {
            if (this.mParameter.Select(p => p.Key.ToLower() == key.ToLower()).Count() > 0)
            {
                this.mParameter.Remove(key);
            }
            this.mParameter.Add(key, value);
        }
    }

    public enum CommandType
    {
        Start,
        Shell,
        ShowDB,
        ShowTable
    }

    public static class CommandFactory
    {
        public static Command Create(CommandType type, CommandParameter parameter)
        {
            switch (type)
            {
                case CommandType.Start:
                    {
                        return new StartCommand();
                    }
                case CommandType.Shell:
                    {
                        return new RunShellCommand();
                    }
                case CommandType.ShowDB:
                    {
                        return new ShowDBCommand();
                    }
                case CommandType.ShowTable:
                    {
                        return new ShowTableCommand();
                    }
            }
            return null;
        }
    }
}
