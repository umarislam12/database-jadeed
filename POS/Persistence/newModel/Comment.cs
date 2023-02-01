using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public string? AuthorId { get; set; }
        public Guid MeetingId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual AspNetUser? Author { get; set; }
        public virtual Meeting Meeting { get; set; } = null!;
    }
}
