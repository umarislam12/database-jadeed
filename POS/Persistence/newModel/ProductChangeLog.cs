using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class ProductChangeLog
    {
        public int? Id { get; set; }
        public DateTime? ChangeDateTime { get; set; }
        public string? ProdName { get; set; }
        public string? ProdNumber { get; set; }
        public string? Description { get; set; }
        public int? QtyStock { get; set; }
        public double? Cost { get; set; }
        public double? WholesalePrice { get; set; }
        public string? Brand { get; set; }
        public int? ProductCat { get; set; }
        public bool? Packed { get; set; }
        public int? VendorId { get; set; }
        public double? RetailPrice { get; set; }
        public byte[]? Picture { get; set; }
    }
}
