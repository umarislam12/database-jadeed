using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class UserMeeting
    {
        public string AppUserId { get; set; } = null!;
        public Guid MeetingId { get; set; }
        public DateTime MeetingDate { get; set; }
        public bool IsCovener { get; set; }

        public virtual AspNetUser AppUser { get; set; } = null!;
        public virtual Meeting Meeting { get; set; } = null!;
    }
}
