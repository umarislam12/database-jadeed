using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class User
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? Login { get; set; }
    }
}
