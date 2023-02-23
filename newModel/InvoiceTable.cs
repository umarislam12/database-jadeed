using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class InvoiceTable
    {
        public int? Id { get; set; }
        public DateTime? DateOfSale { get; set; }
        public int? CustomerId { get; set; }
    }
}
