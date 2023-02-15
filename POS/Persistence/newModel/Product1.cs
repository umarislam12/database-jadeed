using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Product1
    {
        public Product1()
        {
            OrderDetails = new HashSet<OrderDetail>();
            ProductSuppliers = new HashSet<ProductSupplier>();
        }

        public Guid Id { get; set; }
        public string ProductName { get; set; } = null!;
        public string ProductNumber { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int QtyStock { get; set; }
        public string Brand { get; set; } = null!;
        public string Category { get; set; } = null!;
        public double Cost { get; set; }
        public string Vandor { get; set; } = null!;
        public double WholesalePrice { get; set; }
        public double RetailPrice { get; set; }
        public bool Packed { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<ProductSupplier> ProductSuppliers { get; set; }
    }
}
