using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string ProductNumber { get; set; }
        public string Description { get; set; }
        public int QtyStock { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public int Cost { get; set; }
        public string Vandor { get; set; }
        public int WholesalePrice { get; set; }
        public int RetailPrice { get; set; }
        public bool Packed { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
