using Microsoft.EntityFrameworkCore;
using my_new_app.Models;

namespace my_new_app.Data
{
    public class ApplicationDbcontext : DbContext
    {
        public ApplicationDbcontext(DbContextOptions<ApplicationDbcontext> options): base(options)
        {

        }
        public DbSet<CommentList> CommentLists{get;set;}
        public DbSet<Book> books{get;set;}
        public DbSet<Author> authors{get;set;}
        public DbSet<Genre> genres{get;set;}
    }
    
}