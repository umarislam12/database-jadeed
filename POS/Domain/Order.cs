using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderAmount { get; set; }
        public string Comments { get; set; }
        public ICollection<OrderDetail> ProductsDetails { get; set; }
    }
}
