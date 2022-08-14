using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ProductSupplier
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public int ProductCost { get; set; }
    }
}
