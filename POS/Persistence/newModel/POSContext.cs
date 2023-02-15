using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Persistence.newModel
{
    public partial class POSContext : DbContext
    {
        public POSContext()
        {
        }

        public POSContext(DbContextOptions<POSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRole> AspNetRoles { get; set; } = null!;
        public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; } = null!;
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; } = null!;
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; } = null!;
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; } = null!;
        public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Customer1> Customers1 { get; set; } = null!;
        public virtual DbSet<InvoiceDetailsTable> InvoiceDetailsTables { get; set; } = null!;
        public virtual DbSet<InvoiceTable> InvoiceTables { get; set; } = null!;
        public virtual DbSet<Meeting> Meetings { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OrderDetailsTable> OrderDetailsTables { get; set; } = null!;
        public virtual DbSet<OrderRate> OrderRates { get; set; } = null!;
        public virtual DbSet<OrderTable> OrderTables { get; set; } = null!;
        public virtual DbSet<Photo> Photos { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Product1> Products1 { get; set; } = null!;
        public virtual DbSet<ProductCategory> ProductCategories { get; set; } = null!;
        public virtual DbSet<ProductChangeLog> ProductChangeLogs { get; set; } = null!;
        public virtual DbSet<ProductSupplier> ProductSuppliers { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserMeeting> UserMeetings { get; set; } = null!;
        public virtual DbSet<Vendor> Vendors { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Server=localhost; Port=5432; User Id=admin; Password=secret; Database=POS;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRole>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                    .IsUnique();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetRoleClaim>(entity =>
            {
                entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetUser>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                    .IsUnique();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);

                entity.HasMany(d => d.Observers)
                    .WithMany(p => p.Targets)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserFollowing",
                        l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("ObserverId"),
                        r => r.HasOne<AspNetUser>().WithMany().HasForeignKey("TargetId"),
                        j =>
                        {
                            j.HasKey("ObserverId", "TargetId");

                            j.ToTable("UserFollowings");

                            j.HasIndex(new[] { "TargetId" }, "IX_UserFollowings_TargetId");
                        });

                entity.HasMany(d => d.Roles)
                    .WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "AspNetUserRole",
                        l => l.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                        r => r.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                        j =>
                        {
                            j.HasKey("UserId", "RoleId");

                            j.ToTable("AspNetUserRoles");

                            j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                        });

                entity.HasMany(d => d.Targets)
                    .WithMany(p => p.Observers)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserFollowing",
                        l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("TargetId"),
                        r => r.HasOne<AspNetUser>().WithMany().HasForeignKey("ObserverId"),
                        j =>
                        {
                            j.HasKey("ObserverId", "TargetId");

                            j.ToTable("UserFollowings");

                            j.HasIndex(new[] { "TargetId" }, "IX_UserFollowings_TargetId");
                        });
            });

            modelBuilder.Entity<AspNetUserClaim>(entity =>
            {
                entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogin>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserToken>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasIndex(e => e.AuthorId, "IX_Comments_AuthorId");

                entity.HasIndex(e => e.MeetingId, "IX_Comments_MeetingId");

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.AuthorId);

                entity.HasOne(d => d.Meeting)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.MeetingId);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Customer1>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Customer");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.CustName).HasMaxLength(255);
            });

            modelBuilder.Entity<InvoiceDetailsTable>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Invoice_Details_Table");

                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<InvoiceTable>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Invoice_Table");

                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<Meeting>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasIndex(e => e.CustomerId, "IX_Orders_CustomerId");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId);
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.ProductId });

                entity.HasIndex(e => e.ProductId, "IX_OrderDetails_ProductId");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ProductId);
            });

            modelBuilder.Entity<OrderDetailsTable>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Order_Details_Table");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.PurchaseQuantity).HasColumnName("Purchase_Quantity");
            });

            modelBuilder.Entity<OrderRate>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Order_rates");
            });

            modelBuilder.Entity<OrderTable>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Order_Table");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.OrderDate).HasColumnName("Order_Date");

                entity.Property(e => e.VendorId).HasColumnName("Vendor_Id");
            });

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.HasIndex(e => e.AppUserId, "IX_Photos_AppUserId");

                entity.HasOne(d => d.AppUser)
                    .WithMany(p => p.Photos)
                    .HasForeignKey(d => d.AppUserId);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Product");

                entity.Property(e => e.Brand).HasMaxLength(255);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ProdName).HasMaxLength(255);

                entity.Property(e => e.ProdNumber).HasMaxLength(255);

                entity.Property(e => e.ProductCat).HasColumnName("Product_cat");

                entity.Property(e => e.WholesalePrice).HasMaxLength(255);

                entity.Property(e => e.Xahu).HasColumnName("xahu");
            });

            modelBuilder.Entity<Product1>(entity =>
            {
                entity.ToTable("Products");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<ProductCategory>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Product_category");

                entity.Property(e => e.CatName)
                    .HasMaxLength(255)
                    .HasColumnName("Cat_name");
            });

            modelBuilder.Entity<ProductChangeLog>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProductChangeLog");

                entity.Property(e => e.Brand).HasMaxLength(255);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ProdName).HasMaxLength(255);

                entity.Property(e => e.ProdNumber).HasMaxLength(255);

                entity.Property(e => e.ProductCat).HasColumnName("Product_cat");
            });

            modelBuilder.Entity<ProductSupplier>(entity =>
            {
                entity.HasKey(e => new { e.SupplierId, e.ProductId });

                entity.HasIndex(e => e.ProductId, "IX_ProductSuppliers_ProductId");

                entity.Property(e => e.Rmbcost).HasColumnName("RMBCost");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSuppliers)
                    .HasForeignKey(d => d.ProductId);

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.ProductSuppliers)
                    .HasForeignKey(d => d.SupplierId);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FullName).HasMaxLength(50);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Login).HasMaxLength(255);
            });

            modelBuilder.Entity<UserMeeting>(entity =>
            {
                entity.HasKey(e => new { e.AppUserId, e.MeetingId });

                entity.HasIndex(e => e.MeetingId, "IX_UserMeetings_MeetingId");

                entity.HasOne(d => d.AppUser)
                    .WithMany(p => p.UserMeetings)
                    .HasForeignKey(d => d.AppUserId);

                entity.HasOne(d => d.Meeting)
                    .WithMany(p => p.UserMeetings)
                    .HasForeignKey(d => d.MeetingId);
            });

            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Vendor");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.City).HasMaxLength(255);

                entity.Property(e => e.Country).HasMaxLength(255);

                entity.Property(e => e.Phone).HasMaxLength(255);

                entity.Property(e => e.VendorId).HasColumnName("VendorID");

                entity.Property(e => e.VendorName).HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
