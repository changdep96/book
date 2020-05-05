using System.Collections;
using System.Net.NetworkInformation;
using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace my_new_app.Models
{
    public enum processStatus : byte
    {
        Pending = 0,
        Processing = 1,
        Accept = 2,
        Deny = 3,
    }
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        [Required]
        public string nameBook { get; set; }
        // foreiger key for author table
        [Required]
        public int AuthorId { get; set; }

        public Author Author { get; set; }
        public float price { get; set; }
        public string publisher { get; set; }
        public DateTime Created { get; set; }

        
         public ApplicationsUser User{get;set;}
    

        // forieger key genre table
        public int GenreId { get; set; }
        public Genre Genre { get; set; }



        public processStatus processStatus { get; set; }

    }
}