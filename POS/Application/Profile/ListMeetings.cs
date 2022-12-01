using Application.Core;
using Application.Interfaces;
using Application.Meetings;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ListMeetings
    {
        public class Query : IRequest<Result<List<UserMeetingDto>>>
        {
            public string Username { get; set; }
            //public string Predicate { get; set; }
            //public MeetingParams? Params { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserMeetingDto>>>{
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, ILogger<List> logger, IMapper mapper, IUserAccessor
                userAccessor)
            {
                _context = context;
                _logger = logger;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<UserMeetingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.UserMeetings

                           .Where(x => x.AppUser.UserName == request.Username)
                           .OrderBy(a => a.Meeting.MeetingDate)
                           .ProjectTo<UserMeetingDto>(_mapper.ConfigurationProvider)
                           .AsQueryable();
                //var userMeeting = new List<UserMeetingDto>();
                query = request.Predicate switch
                {
                    "past" =>
                        query.Where(x => x.MeetingDate <= DateTime.UtcNow),
                    "hosting" => query.Where(x => x.HostUsername == request.Username),

                _ => query.Where(x => x.MeetingDate >= DateTime.UtcNow),
                



                    //.Where(d => d.MeetingDate >= request.Params.StartDate)


                };
            //  var meetingsToReturn=_mapper.Map<List<MeetingDto>>(meetings);
            var meetings= await query.ToListAsync();
                return Result<List<UserMeetingDto>>.Success(
                    meetings);
            }
        }
    }
}
