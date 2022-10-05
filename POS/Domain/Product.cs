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
        public double Cost { get; set; }
        public string Vandor { get; set; }
        public double WholesalePrice { get; set; }
        public double RetailPrice { get; set; }
        public bool Packed { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public ICollection<ProductSupplier> Suppliers { get; set; }
        public ICollection<OrderDetail> Orders { get; set; }
    }
}
