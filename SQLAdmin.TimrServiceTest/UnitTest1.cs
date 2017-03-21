using System;
using System.ServiceModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.ServiceModel.Channels;
using MMS.TimerContract;

namespace MMS.TimrServiceTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestSchedule()
        {
            IChannelFactory<ISchedule> factory = new ChannelFactory<ISchedule>(new NetTcpBinding(), new EndpointAddress("net.tcp://127.0.0.1:1271"));
            ISchedule schedule = factory.CreateChannel(new EndpointAddress("net.tcp://127.0.0.1:1271"));
            schedule.Add(AssignmentType.MongoDBBackup, new TimeSpan(3));
        }
    }
}
