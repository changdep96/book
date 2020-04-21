using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class Genre
    {
        [Key]
        public int id{get;set;}
        public string name{get;set;}
         public ICollection<Book> Book{get;set;}
    }
}