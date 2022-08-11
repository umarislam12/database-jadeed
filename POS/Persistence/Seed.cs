using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any()) 
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                            DisplayName="Bob", UserName="bob", Email="Bob@test.com", Bio="abc"
                    },
                     new AppUser
                    {
                            DisplayName="John", UserName="john", Email="john@test.com", Bio="abc"
                    },
                      new AppUser
                    {
                            DisplayName="Marley", UserName="marley", Email="marley@test.com", Bio="abc"
                    }
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    ProductName = "Product 1",
                    ProductNumber = "12*22*5",
                    Created = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    QtyStock = 10,
                   Cost = 0.9,
                   RetailPrice=1.2,
                   WholesalePrice=1.0,
                   Brand="NOK",
                   Vandor="Xionen",
                   Packed=false,
                   Modified=DateTime.Now.AddMonths(-2),

                },
                new Product
                {
                     ProductName = "Product 2",
                     ProductNumber = "12*22*5",
                    Created = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    QtyStock = 10,
                   Cost = 0.9,
                    RetailPrice=1.2,
                    WholesalePrice=1.0,
                   Brand="NOK",
                   Vandor="Xionen",
                   Packed=false,
                   Modified=DateTime.Now.AddMonths(-2),

                },
                new Product
                {
                   ProductName = "Product 3",
                   ProductNumber = "12*22*5",
                    Created = DateTime.Now.AddMonths(-2),
                    Description = "product 3",
                    Category = "drinks",
                    QtyStock = 10,
                   Cost = 0.9,
                    RetailPrice=1.2,
                    WholesalePrice=1.0,
                   Brand="NOK",
                   Vandor="Xionen",
                   Packed=false,
                   Modified=DateTime.Now.AddMonths(-2),

                },
              
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}