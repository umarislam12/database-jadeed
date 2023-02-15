using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class OrderDetail
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }

        public virtual Order Order { get; set; } = null!;
        public virtual Product1 Product { get; set; } = null!;
    }
}
