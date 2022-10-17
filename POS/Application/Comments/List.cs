using Application.Core;
using Application.Interfaces;
using Application.Meetings;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid MeetingId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            
            public Handler(DataContext context, IMapper mapper)
            {
               _context = context;
                _mapper = mapper;
                
            }

            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var comments = await _context.Comments
                    .Where(x=>x.Meeting.Id ==request.MeetingId)
                    .OrderByDescending(x=>x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)

                    .ToListAsync(cancellationToken);
                return Result<List<CommentDto>>.Success(comments);
            }
        }
    }
}
