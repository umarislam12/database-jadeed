using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class OrderDetailsTable
    {
        public int? Id { get; set; }
        public int? Product { get; set; }
        public int? OrderId { get; set; }
        public int? PurchaseQuantity { get; set; }
    }
}
