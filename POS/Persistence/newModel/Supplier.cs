using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Supplier
    {
        public Supplier()
        {
            ProductSuppliers = new HashSet<ProductSupplier>();
        }

        public Guid Id { get; set; }
        public string SupplierName { get; set; } = null!;
        public string SupplierAddress { get; set; } = null!;
        public string SupplierContact { get; set; } = null!;
        public string Description { get; set; } = null!;

        public virtual ICollection<ProductSupplier> ProductSuppliers { get; set; }
    }
}
