using System.Collections;
using System.Net.NetworkInformation;
using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace my_new_app.Models
{
    public class Book
    {
        	[Key]
        public int id{ get;set;}
[Required]
        public string nameBook{get;set;}
        // foreiger key for author table
      [ForeignKey("AuthorId")]
        public Author Author{get;set;}
        public float price{get;set;}
        public string publisher{get;set;}
        public DateTime Created{get;set;}
       
        // forieger key genre table
       [ForeignKey("genreId")]
       public Genre genre{get;set;}
    
       
        public enum  processStatus
        {
            Pending=0,
            Processing=1,
            Accept=2,
            Deny=3,
        }

    }
}