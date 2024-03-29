﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Meeting
    {
        public Guid Id { get; set; }
        public string? Agenda { get; set; }
        public DateTime MeetingDate { get; set; }
        public bool IsCancelled { get; set; }
        public string? HostUsername { get; set; }
        public ICollection<UserMeeting> Attendees { get; set; } = new List<UserMeeting>();
        public ICollection<Comment> Comments { get; set; }=new List<Comment>(); 
    }
}
