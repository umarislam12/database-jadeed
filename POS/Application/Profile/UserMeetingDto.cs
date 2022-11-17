using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class UserMeetingDto
    {
        public Guid Id { get; set; }
        public string Agenda { get; set; }
        public DateTime MeetingDate { get; set; }

        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}
