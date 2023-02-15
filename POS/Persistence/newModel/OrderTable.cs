using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class OrderTable
    {
        public int? Id { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? VendorId { get; set; }
    }
}
