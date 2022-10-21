
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Meetings
{
    public class List
    {
        //List.Query
        public class Query : IRequest<Result<List<MeetingDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<MeetingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, ILogger<List> logger, IMapper mapper, IUserAccessor
                userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<MeetingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                ///*  try
                //  {
                //      for(var i=0; i <10; i++)
                //      {
                //         cancellationToken.ThrowIfCancellationRequested();
                //          await Task.Delay(1000, cancellationToken);
                //          _logger.LogInformation($"Task {i} has completed");
                //      }
                //  }
                //  catch(Exception ex) when (ex is TaskCanceledException)
                //  {
                //      _logger.LogInformation("Task was cancelled");

                //  }*/
                var meetings = await _context.Meetings
                    //.Include(a=>a.Attendees)
                    //.ThenInclude(u=>u.AppUser)
                    .ProjectTo<MeetingDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername()})
                    .ToListAsync(cancellationToken);
              //  var meetingsToReturn=_mapper.Map<List<MeetingDto>>(meetings);
                return Result<List<MeetingDto>>.Success(meetings);
            }
        }
    }
}
