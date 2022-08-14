using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserMeeting
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid MeetingId { get; set; }
        public Meeting Meeting { get; set; }
        public DateTime MeetingDate { get; set; }
        public bool IsCovener { get; set; }
    }
}
