using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Meetings
{
    public class Create
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
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var attendee = new UserMeeting
                {
                    AppUser = user,
                    Meeting = request.Meeting,
                    MeetingDate = DateTime.Now,
                    IsCovener=true
                };
                request.Meeting.Attendees.Add(attendee);

                _context.Meetings.Add(request.Meeting);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}