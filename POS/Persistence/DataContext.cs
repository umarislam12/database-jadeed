 using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext:IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ProductSupplier> ProductSuppliers { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<UserMeeting> UserMeetings { get; set; }
        public DbSet <Photo> Photos { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ProductSupplier>(x => x.HasKey(aa => new { aa.SupplierId, aa.ProductId }));
            builder.Entity<ProductSupplier>()
                .HasOne(p => p.Product)
                .WithMany(s => s.Suppliers)
                .HasForeignKey(aa => aa.ProductId);
            builder.Entity<ProductSupplier>()
                .HasOne(s => s.Supplier)
                .WithMany(p => p.Products)
                .HasForeignKey(aa => aa.SupplierId);

            
           
            builder.Entity<UserMeeting>(x => x.HasKey(aa => new { aa.AppUserId, aa.MeetingId }));
            builder.Entity<UserMeeting>()
                .HasOne(u => u.AppUser)
                .WithMany(m => m.Meetings)
                .HasForeignKey(aa => aa.AppUserId);
            builder.Entity<UserMeeting>()
                .HasOne(m => m.Meeting)
                .WithMany(u => u.Attendees)
                .HasForeignKey(aa => aa.MeetingId);

            builder.Entity<OrderDetail>(x => x.HasKey(aa => new { aa.OrderId, aa.ProductId }));
            builder.Entity<OrderDetail>()
                .HasOne(o=>o.Order)
                .WithMany(p=> p.ProductsDetails)
                .HasForeignKey(aa=>aa.OrderId);
            builder.Entity<OrderDetail>()
              .HasOne(o => o.Product)
              .WithMany(o => o.Orders)
              .HasForeignKey(aa => aa.ProductId);

            builder.Entity<Comment>()
            .HasOne(m=>m.Meeting)
            .WithMany(c=>c.Comments)
            .OnDelete(DeleteBehavior.Cascade);    
        }
    }
}
