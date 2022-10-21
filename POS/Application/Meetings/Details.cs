using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meetings
{
    public class Details
    {
        public class Query : IRequest<Result<MeetingDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<MeetingDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<MeetingDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var meeting = await _context.Meetings
                    .ProjectTo<MeetingDto>(_mapper.ConfigurationProvider, new { currentUsername= _userAccessor.GetUsername() })
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<MeetingDto>.Success(meeting);
            }
        }
    }
}
