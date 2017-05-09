using SQLAdmin.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLAdmin.Domain;
using System.Data.SqlClient;
using System.Data;
using SQLServer.Utility;

namespace SQLServer.Dao
{
    public class SQLServerDBRepertory : IRepertory
    {
        protected SQLServerDBContext DBContext
        {
            get
            {
                return SQLServerDBContextScope.DBContext as SQLServerDBContext;
            }
        }

        public bool Connect()
        {
            using (var conn = this.DBContext.GetConnect())
            {
                return conn != null;
            }
        }

        public bool CreateTable(Table table)
        {
            string sql = new SQLQuery().Create(table.Name).Table().Qenerate();
            var result = this.DBContext.AccessQuery(sql);
            return result > 0;
        }

        public DataTable Filter(DataFilter filter)
        {
            string sql = new SQLQuery().Select("*").From(filter.TableName).OrderBy(filter.SortColumn, filter.IsAsc).Skip((filter.PageIndex - 1) * filter.PageSize).Take(filter.PageSize).Qenerate();
            return this.DBContext.SqlReader(sql);
        }

        public List<Database> GetDatabases()
        {
            //string sql = "SELECT * FROM Master..SysDatabases ORDER BY crdate";
            string sql = new SQLQuery().Select("*").From("Master..SysDatabases").OrderBy("crdate", true).Qenerate();
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
           {
               return new Database()
               {
                   Id = Guid.NewGuid(), //row["dbid"].ToString(),
                   Name = row["name"].ToString()
               };
           });
        }

        public List<FieldType> GetFieldTypes()
        {
            // SELECT* FROM sys.types
            string sql = new SQLQuery().Select("*").From("sys.types").OrderBy("name").Qenerate();
            var types = this.DBContext.SqlReader(sql);
            return types.ToList(row =>
            {
                return new FieldType()
                {
                    DisplayName = row["name"].ToString(),
                    IsNullable = Convert.ToInt32(row["is_nullable"]),
                    MaxLength = Convert.ToInt32(row["max_length"])
                };
            });
        }

        public List<Table> GetTables(string dbName)
        {
            //string sql = $"SELECT * FROM {dbName}..SysObjects Where XType='U' ORDER BY Name";
            string sql = new SQLQuery().Select("*").From($"{dbName}..SysObjects").Where("type='U'").OrderBy("Name", true).Qenerate();
            var dataTable = this.DBContext.SqlReader(sql);
            List<Table> tables = new List<Table>();
            return dataTable.ToList(row =>
            {
                return new Table()
                {
                    Id = row["id"].ToString(),
                    Name = row["name"].ToString(),
                    Fullname = $"[{dbName}].[dbo].[{row["name"].ToString()}]"
                };
            });
        }

        public List<Field> GetTableFields(string tableName)
        {
            //select * from RP_DB..SysColumns where id = (select id from RP_DB..sysobjects where Name = 'SLA_SubmissionForm')
            //string sql = new SQLQuery().Select("*").From("SysColumns").wher
            var dbName = tableName.Split('.').First();
            var tbName = tableName.Split('.').Last().Remove(0, 1);
            tbName = tbName.Remove(tbName.Length - 1, 1);
            string sql = $"select * from {dbName}..SysColumns where id = (select id from {dbName}..sysobjects where Name = '{tbName}')";
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
            {
                return new Field()
                {
                    Id = row["id"].ToString(),
                    Name = row["name"].ToString()
                };
            });
        }

        public int Count(string tableName)
        {
            string sql = new SQLQuery().Count().From(tableName).Qenerate();
            return Convert.ToInt32(this.DBContext.SqlScaler(sql));
        }

        public bool Remove(RemoveFilter filter)
        {
            string sql = new SQLQuery().Delete(filter.TableName).Where($"ID in ('{String.Join("','", filter.Selected.ToArray())}')").Qenerate();
            return this.DBContext.AccessQuery(sql) > 0;
        }

        public List<Index> GetTableIndexs(string tableName)
        {
            var dbName = tableName.Split('.').First();
            var tbName = tableName.Split('.').Last().Remove(0, 1);
            tbName = tbName.Remove(tbName.Length - 1, 1);
            string sql = $"select _index.id as id,_index.indid as indid,_index.name as indname,_col.name as colname from {dbName}..SysColumns as _col join (select t_key.id, t_key.indid,t_key.colid,t_index.name from {dbName}..sysindexkeys as t_key inner join {dbName}..sysindexes as t_index on t_key.indid = t_index.indid  where t_key.id = t_index.id and t_key.id=(select id from {dbName}..sysobjects where Name = '{tbName}')) as _index on _index.colid = _col.colid where _col.id = _index.id";
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
            {
                return new Index()
                {
                    Id = row["id"].ToString(),
                    ColumnName = row["colname"].ToString(),
                    IndexName = row["indname"].ToString(),
                    Type = row["indid"].ToString().Equals("1", StringComparison.OrdinalIgnoreCase) ? IndexType.Primary : IndexType.Foreign
                };
            });
        }

        public List<CPUInfo> GetCPUInfos()
        {
            string sql = @"DECLARE @ts_now bigint = (SELECT cpu_ticks/(cpu_ticks/ms_ticks)FROM sys.dm_os_sys_info);

SELECT SQLProcessUtilization AS[SQL Server Process CPU Utilization], 
               SystemIdle AS[System Idle Process],
               100 - SystemIdle - SQLProcessUtilization AS[Other Process CPU Utilization], 
               DATEADD(ms, -1 * (@ts_now - [timestamp]), GETDATE()) AS[Event Time]
FROM(
      SELECT record.value('(./Record/@id)[1]', 'int') AS record_id,
            record.value('(./Record/SchedulerMonitorEvent/SystemHealth/SystemIdle)[1]', 'int')
            AS[SystemIdle],
            record.value('(./Record/SchedulerMonitorEvent/SystemHealth/ProcessUtilization)[1]',
            'int')
            AS[SQLProcessUtilization], [timestamp]
      FROM(
            SELECT[timestamp], CONVERT(xml, record) AS[record]
            FROM sys.dm_os_ring_buffers
            WHERE ring_buffer_type = N'RING_BUFFER_SCHEDULER_MONITOR'
            AND record LIKE N'%<SystemHealth>%') AS x
      ) AS y
ORDER BY record_id DESC; ";
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
            {
                return new CPUInfo()
                {
                    DBProess = Convert.ToInt32(row["SQL Server Process CPU Utilization"]),
                    IDLEProcess = Convert.ToInt32(row["System Idle Process"]),
                    OtherProcess = Convert.ToInt32(row["Other Process CPU Utilization"]),
                    EventTime = row["Event Time"].ToString()
                };
            });
        }

        public List<ConnectedInfo> GetConnectedInfos()
        {
            string sql = @" DECLARE @ts_now bigint = (SELECT cpu_ticks/(cpu_ticks/ms_ticks)FROM sys.dm_os_sys_info);
  SELECT record.value('(./Record/@id)[1]', 'int') AS record_id,
            record.value('(./Record/ConnectivityTraceRecord/RemoteHost)[1]', 'varchar(100)')
            AS ip, DATEADD(ms, -1 * (@ts_now - [timestamp]), GETDATE()) AS[Event Time] 
			from
 (SELECT timestamp, CONVERT(xml, record) as record FROM sys.dm_os_ring_buffers where ring_buffer_type = 'RING_BUFFER_CONNECTIVITY') as t";
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
            {
                return new ConnectedInfo
                {
                    EventTime = row["Event Time"].ToString(),
                    Ip = row["ip"].ToString()
                };
            });
        }

        public bool DeleteDatabase(string databaseName)
        {
            string sql = new SQLQuery().Drop(databaseName).Qenerate();
            return this.DBContext.AccessQuery(sql) > 0;
        }

        public List<ExceptionInfo> GetExceptionInfos()
        {
            string sql = $@"DECLARE @ts_now bigint = (SELECT cpu_ticks/(cpu_ticks/ms_ticks)FROM sys.dm_os_sys_info);
select DATEADD(ms, -1 * (@ts_now - [timestamp]), GETDATE()) AS[Event Time] ,[text] from(SELECT
record.value('(./Record/@id)[1]', 'int') AS record_id,
record.value('(./Record/Exception/Error)[1]', 'int') AS Error,
record.value('(./Record/Exception/UserDefined)[1]', 'int') AS UserDefined, TIMESTAMP
FROM(
SELECT TIMESTAMP, CONVERT(XML, record) AS record
FROM sys.dm_os_ring_buffers
WHERE ring_buffer_type = N'RING_BUFFER_EXCEPTION') as e) as excption join sys.messages as messages on excption.Error = messages.message_id where messages.language_id = 2052";
            var dataTable = this.DBContext.SqlReader(sql);
            return dataTable.ToList(row =>
            {
                return new ExceptionInfo()
                {
                    EventTime = row["Event Time"].ToString(),
                    Message = row["text"].ToString()
                };
            });
        }
    }
}
