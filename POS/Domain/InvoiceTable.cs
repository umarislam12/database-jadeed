using System;
using System.Collections.Generic;

namespace Persistence.newModel
{
    public class InvoiceTable
    {
        public int Id { get; set; }
        public DateTime DateOfSale { get; set; }
        public int CustomerId { get; set; }
        public ICollection<InvoiceDetails> InvoiceDetails { get; set; }=new List<InvoiceDetails>();              
    }
}
