﻿using Application.Meetings;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>();
            CreateMap<Meeting, Meeting>();
            CreateMap<Meeting, MeetingDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                      .FirstOrDefault(x => x.IsCovener).AppUser.UserName));
            CreateMap<UserMeeting, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));


        }

        
    }
}
