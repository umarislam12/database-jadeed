using Application.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Meetings
{
    public class MeetingDto
    {
        public Guid Id { get; set; }
        public string Agenda { get; set; }
        public DateTime MeetingDate { get; set; }
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }

        public ICollection<AttendeeDto> Attendees { get; set; }
    }
}
