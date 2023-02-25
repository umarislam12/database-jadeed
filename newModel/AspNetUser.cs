using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class AspNetUser
    {
        public AspNetUser()
        {
            AspNetUserClaims = new HashSet<AspNetUserClaim>();
            AspNetUserLogins = new HashSet<AspNetUserLogin>();
            AspNetUserTokens = new HashSet<AspNetUserToken>();
            Comments = new HashSet<Comment>();
            Photos = new HashSet<Photo>();
            UserMeetings = new HashSet<UserMeeting>();
            Observers = new HashSet<AspNetUser>();
            Roles = new HashSet<AspNetRole>();
            Targets = new HashSet<AspNetUser>();
        }

        public string Id { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string Bio { get; set; } = null!;
        public string? UserName { get; set; }
        public string? NormalizedUserName { get; set; }
        public string? Email { get; set; }
        public string? NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public string? PasswordHash { get; set; }
        public string? SecurityStamp { get; set; }
        public string? ConcurrencyStamp { get; set; }
        public string? PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTime? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }

        public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<UserMeeting> UserMeetings { get; set; }

        public virtual ICollection<AspNetUser> Observers { get; set; }
        public virtual ICollection<AspNetRole> Roles { get; set; }
        public virtual ICollection<AspNetUser> Targets { get; set; }
    }
}
