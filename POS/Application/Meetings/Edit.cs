using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Meetings
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Meeting Meeting { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Meeting).SetValidator(new MeetingsValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var meeting = await _context.Meetings.FindAsync(request.Meeting.Id);
                if (meeting == null) return null;
                _mapper.Map(request.Meeting, meeting);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("fails to edit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
