using Common.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;

namespace SQLServer.Service.Schedule
{
    public class MonitorCPUSchedule
    {
        public void Execute(string context)
        {
            MonitorCPUDto monitorCPUDto = SerializerHelper.DeserializeObjectByJsonConvert<MonitorCPUDto>(context);
            //// 获取本机信息，注意这里不带ConnectionOptions参数;
            //ManagementScope scope = new ManagementScope("\\\\127.0.0.1\\root\\CIMv2");

            // 获取远端主机信息，注意这里需要使用ConnectionOptions参数控制连接;
            ConnectionOptions options = new ConnectionOptions();
            options.Username = "Administrator";
            options.Password = "xxxxxxxxx";
            options.EnablePrivileges = true; //获取尽可能高的权限;
            options.Impersonation = ImpersonationLevel.Impersonate;
            options.Authentication = AuthenticationLevel.PacketPrivacy; //加密数据流;
          
            ManagementScope scope = new ManagementScope("\\\\PAD1\\root\\CIMv2", options);
            scope.Connect();
            ObjectQuery query = new ObjectQuery("SELECT * FROM Win32_OperatingSystem");
            ManagementObjectSearcher searcher = new ManagementObjectSearcher(scope, query);
            ManagementObjectCollection queryCollection = searcher.Get();
            foreach (ManagementObject m in queryCollection)
            {
                // Display the remote computer information
                Console.WriteLine("Computer Name : {0}", m["csname"]);
                Console.WriteLine("Windows Directory : {0}", m["WindowsDirectory"]);
                Console.WriteLine("Operating System: {0}", m["Caption"]);
                Console.WriteLine("Version: {0}", m["Version"]);
                Console.WriteLine("Manufacturer : {0}", m["Manufacturer"]);
            }
        }
    }

    public class MonitorCPUDto
    {

    }
}
