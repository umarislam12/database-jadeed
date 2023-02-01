using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class InvoiceDetailsTable
    {
        public int? Id { get; set; }
        public int? InvoiceId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
    }
}
