using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Photo
    {
        public string Id { get; set; } = null!;
        public string Url { get; set; } = null!;
        public bool IsMain { get; set; }
        public string? AppUserId { get; set; }

        public virtual AspNetUser? AppUser { get; set; }
    }
}
