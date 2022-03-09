using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    ProductName = "Product 1",
                    Created = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    QtyStock = 10,
                   Cost = 0.9,
                },
                new Product
                {
                     ProductName = "Product 2",
                    Created = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    QtyStock = 10,
                   Cost = 0.9,
                },
                new Product
                {
                   ProductName = "Product 3",
                    Created = DateTime.Now.AddMonths(-2),
                    Description = "product 3",
                    Category = "drinks",
                    QtyStock = 10,
                   Cost = 0.9,
                },
              
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}