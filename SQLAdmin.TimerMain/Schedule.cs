using MMS.TimerContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.TimerMain
{
    public class Schedule : ISchedule
    {
        private List<Assignment> mAssignments = new List<Assignment>();

        public void Add(AssignmentType type, TimeSpan timeSpan)
        {
            switch (type)
            {
                case AssignmentType.Backup:
                    {
                        Assignment assignment = new BackupAssignment(timeSpan);
                        this.mAssignments.Add(assignment);
                        break;
                    }
            }
        }
    }
}
