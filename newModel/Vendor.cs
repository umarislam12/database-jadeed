using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Vendor
    {
        public int? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Phone { get; set; }
    }
}
