using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ProfilesValidator : AbstractValidator<Profile>
    {
        public ProfilesValidator()
        {
            RuleFor(x => x.Username).NotEmpty();
        }
    }
}
