using SQLAdmin.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SQLServer.Utility
{
    public static class RingBufferHelper
    {
        public static CPUViewModel ParseXMLToCPUnfo(string xml)
        {
            #region xml 格式
            //<Record id="316" type="RING_BUFFER_SCHEDULER_MONITOR" time="19043919">
            //  <SchedulerMonitorEvent>
            //    <SystemHealth>
            //      <ProcessUtilization>0</ProcessUtilization>
            //      <SystemIdle>90</SystemIdle>
            //      <UserModeTime>10781250</UserModeTime>
            //      <KernelModeTime>3281250</KernelModeTime>
            //      <PageFaults>633</PageFaults>
            //      <WorkingSetDelta>2158592</WorkingSetDelta>
            //      <MemoryUtilization>58</MemoryUtilization>
            //    </SystemHealth>
            //  </SchedulerMonitorEvent>
            //</Record> 
            #endregion
            XElement rooeElement = XElement.Parse(xml);
            XElement schedulerMonitorEvent = rooeElement.Element("SchedulerMonitorEvent");
            XElement systemHealth = schedulerMonitorEvent.Element("SystemHealth");
            CPUViewModel info = new CPUViewModel();
            info.DBProess = Convert.ToInt32(systemHealth.Element("ProcessUtilization").Value);
            info.IDLEProcess = Convert.ToInt32(systemHealth.Element("SystemIdle").Value);
            info.OtherProcess = 100 - info.IDLEProcess - info.DBProess;
            return info;
        }

        public static MemoryViewModel ParseXMLToMemoryInfo(string xml)
        {
            XElement rooeElement = XElement.Parse(xml);
            XElement schedulerMonitorEvent = rooeElement.Element("SchedulerMonitorEvent");
            XElement systemHealth = schedulerMonitorEvent.Element("SystemHealth");
            MemoryViewModel info = new MemoryViewModel();
            info.MemoryUtilization = Convert.ToInt32(systemHealth.Element("MemoryUtilization").Value);
            return info;
        }
    }
}
