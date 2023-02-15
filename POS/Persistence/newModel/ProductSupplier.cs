using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class ProductSupplier
    {
        public Guid ProductId { get; set; }
        public Guid SupplierId { get; set; }
        public int Rmbcost { get; set; }
        public int RupeesPrice { get; set; }

        public virtual Product1 Product { get; set; } = null!;
        public virtual Supplier Supplier { get; set; } = null!;
    }
}
