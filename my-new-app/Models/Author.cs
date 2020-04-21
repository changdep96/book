using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class Author
    {
        [Key]
        public int id{get;set;}
        public string Name{get;set;}
        public string Email{get;set;}
        public bool gender{get;set;}
        public ICollection<Book> book{get;set;}
    }
}