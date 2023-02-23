using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Meeting
    {
        public Meeting()
        {
            Comments = new HashSet<Comment>();
            UserMeetings = new HashSet<UserMeeting>();
        }

        public Guid Id { get; set; }
        public string? Agenda { get; set; }
        public DateTime MeetingDate { get; set; }
        public bool IsCancelled { get; set; }
        public string? HostUsername { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<UserMeeting> UserMeetings { get; set; }
    }
}
