using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Supplier
    {
        public Guid Id { get; set; }
        public string SupplierName { get; set; }
        public string SupplierAddress { get; set; }
        public string SupplierContact { get; set; }
        public string Description { get; set; }
        public ICollection<ProductSupplier> Products { get; set; }
    }
}
