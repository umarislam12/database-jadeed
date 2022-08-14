using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Meetings
{
    public class MeetingsValidator : AbstractValidator<Meeting>
    {
        public MeetingsValidator()
        {
            RuleFor(x=>x.Agenda).NotEmpty();
            RuleFor(x => x.MeetingDate).NotEmpty();
        }
    }
}
