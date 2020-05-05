using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using my_new_app.Models;
using Microsoft.AspNetCore.Identity;

namespace my_new_app.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationsUser,Role,int,IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
  
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //========================================================================
            // Tên bảng cho các bảng identity
            builder.Entity<ApplicationsUser>().ToTable("Users");
            builder.Entity<Role>().ToTable("Roles");
            builder.Entity<IdentityUserToken<int>>().ToTable("UserTokens");
            builder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaims");
            builder.Entity<UserRole>().ToTable("UserRoles");
            builder.Entity<IdentityUserClaim<int>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<int>>().ToTable("UserLogins");

            //========================================================================
            // relationsshop
           builder.Entity<Author>()
           .HasMany(b=>b.book)
           .WithOne(a=>a.Author);

 builder.Entity<ApplicationsUser>()
 .HasMany(b=>b.books)
 .WithOne(a=>a.User);
        }

         public DbSet<CommentList> CommentLists{get;set;}
        public DbSet<Book> books{get;set;}
        public DbSet<Author> authors{get;set;}
        public DbSet<Genre> genres{get;set;}
   
    }
}
