using Application.Core;
using Application.Interfaces;
using Domain;
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
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var meeting=await _context.Meetings
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x=>x.Id==request.Id);
                if (meeting == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => 
                x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = meeting.Attendees.FirstOrDefault(x => x.IsCovener)?.AppUser?.UserName;

                var attendance= meeting.Attendees.FirstOrDefault(x=> x.AppUser.UserName == user.UserName);

                if(attendance != null && hostUsername == user.UserName) meeting.IsCancelled = !meeting.IsCancelled;

                if(attendance != null && hostUsername != user.UserName) meeting.Attendees.Remove(attendance);

               if(attendance== null)
                {
                    attendance = new UserMeeting
                    {
                        AppUser = user,
                        Meeting = meeting,
                        IsCovener = false,
                    };
                    meeting.Attendees.Add(attendance);
                }
               var result= await _context.SaveChangesAsync()>0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("failure updating attence");
            }
        }
    }
} 
