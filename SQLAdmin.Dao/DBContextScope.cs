using SQLAdmin.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.Dao
{
    public abstract class DBContextScope : IDisposable
    {
        public static DBContext DBContext { get; protected set; }

        public DBContextScope(DBConnect dbConnect)
        {
            this.Initialize(dbConnect);
        }

        protected abstract void Initialize(DBConnect dbConnect);

        public T GetDBContext<T>() where T : DBContext
        {
            return DBContext as T;
        }

        public void Dispose()
        {
            
        }
    }
}
