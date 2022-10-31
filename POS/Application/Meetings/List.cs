
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
        public class Query : IRequest<Result<PagedList<MeetingDto>>> {
            public MeetingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<MeetingDto>>>
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

            public async Task<Result<PagedList<MeetingDto>>> Handle(Query request, CancellationToken cancellationToken)
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
                var query =  _context.Meetings
                    //.Include(a=>a.Attendees)
                    //.ThenInclude(u=>u.AppUser)


                   .Where(d => d.MeetingDate >= request.Params.StartDate)
                    .OrderBy(d => d.MeetingDate)
                    .ProjectTo<MeetingDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();
                if(request.Params.IsGoing && !request.Params.IsHost)
                {
                    //filters are only clickable by curent logged user
                    query = query.Where(x=>x.Attendees.Any(a =>a.Username  == _userAccessor.GetUsername()));
                }
                if(request.Params.IsHost && !request.Params.IsGoing)
                {
                    query=query.Where(x=>x.HostUsername == _userAccessor.GetUsername());
                }
              //  var meetingsToReturn=_mapper.Map<List<MeetingDto>>(meetings);
                return Result<PagedList<MeetingDto>>.Success(
                    await PagedList<MeetingDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                    );
            }
        }
    }
}
