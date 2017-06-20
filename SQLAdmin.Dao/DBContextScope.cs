using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Dao
{
    public abstract class DBContextScope : IDisposable
    {
        private static readonly string mDBContextName = "DBContext";
        private static readonly string mDBContextRecord = "DBContextRecord";

        public DBContextScope(DBConnect dbConnect)
        {
            var dbContext = this.Initialize(dbConnect);
            if(!this.IsContextExist())
            {
                this.RegisterContext(dbContext);
            }
            this.AppendRecord();
        }

        protected abstract DBContext Initialize(DBConnect dbConnect);

        public static DBContext GetDBContext()
        {
            return CallContext.GetData(mDBContextName) as DBContext;
        }

        public void Dispose()
        {
            if(this.IsCanUnRegisterContext())
            {
                this.UnRegisterContext();
            }
            this.FreeRecord();
        }

        private bool IsContextExist()
        {
            var obj = CallContext.GetData(mDBContextName);
            return obj != null;
        }

        private void RegisterContext(DBContext dbContext)
        {
            CallContext.SetData(mDBContextName, dbContext);
        }

        private void UnRegisterContext()
        {
            CallContext.FreeNamedDataSlot(mDBContextName);
        }

        private void AppendRecord()
        {
            var record = CallContext.GetData(mDBContextRecord);
            if(record == null)
            {
                CallContext.SetData(mDBContextRecord, 1);
            }
            else
            {
                CallContext.SetData(mDBContextRecord, ((int)record) + 1);
            }
        }

        private void FreeRecord()
        {
            var record = CallContext.GetData(mDBContextRecord);
            if(record != null)
            {
                CallContext.SetData(mDBContextRecord, ((int)record) - 1);
            }
        }

        public bool IsCanUnRegisterContext()
        {
            var record = CallContext.GetData(mDBContextRecord);
            if(record != null)
            {
                return (int)record <= 1;
            }
            return false;
        }
    }
}
