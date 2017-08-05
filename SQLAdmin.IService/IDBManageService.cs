using SQLAdmin.Domain;
using SQLAdmin.Utility.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLAdmin.IService
{
    public interface IDBManageService
    {
        TableDataViewMdoel Select(DataFilter filter);

        bool Delete(RemoveFilter filter);

        bool Update(UpdateFilter filter);

        ExecViewModel Exec(string code, Language language);
    }
}
