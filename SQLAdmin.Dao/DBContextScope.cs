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

        public DBContextScope(DBConnect dbConnect)
        {
            var dbContext = this.Initialize(dbConnect);
            CallContext.SetData(mDBContextName, dbContext);
        }

        protected abstract DBContext Initialize(DBConnect dbConnect);

        public static DBContext GetDBContext()
        {
            return CallContext.GetData(mDBContextName) as DBContext;
        }

        public void Dispose()
        {
            CallContext.FreeNamedDataSlot(mDBContextName);
        }
    }
}
