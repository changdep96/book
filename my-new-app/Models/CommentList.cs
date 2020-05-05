using System.Collections.Generic;

namespace my_new_app.Models
{
    public class CommentList
    {
    public int Id{get;set;}
     public string User{get;set;}
     public string Title{get;set;}
      public ICollection<Book> book{get;set;}
    }
} 