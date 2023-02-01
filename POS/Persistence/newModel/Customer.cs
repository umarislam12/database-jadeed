using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public Guid Id { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerAddress { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; }
    }
}
