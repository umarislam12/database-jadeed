using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderAmount { get; set; }
        public string Comments { get; set; } = null!;
        public Guid? CustomerId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
