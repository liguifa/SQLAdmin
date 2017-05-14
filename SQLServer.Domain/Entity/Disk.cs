using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Domain
{
    [EntityTable("sys.master_files")]
    public class Disk
    {
        [EntityColumn("database_id","sys.master_files.database_id")]
        public long DatabaseId { get; set; }

        [EntityColumn("file_id","sys.master_files.file_id")]
        public long FileId { get; set; }
        
        [EntityColumn("name")]
        public string DatabaseName { get; set; }
        
        [EntityColumn("volume_mount_point")]
        public string VolumeMountPoint { get; set; } 
        
        [EntityColumn("total_bytes")]
        public long TotalSpace { get; set; }
        
        [EntityColumn("available_bytes")]
        public long AvailableSpace { get; set; }
    }
}
