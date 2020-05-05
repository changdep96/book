using System.Net;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_new_app.Data;
using my_new_app.Models;
using System.Linq;

namespace my_new_app.Controllers
{
    [Route("api/Author")]
    [ApiController]
    public class AuthorController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthorController(ApplicationDbContext context)
        {
       _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAll()
        {
            var query = await _context.authors.ToListAsync();
            return query;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult>  Update(int id, [FromBody] Author model)
        {
          var found=await _context.authors.FindAsync(id);
          if(found!=null)
          {
              found.Name=model.Name;
              found.Email=model.Email;
              found.gender=model.gender;
              await _context.SaveChangesAsync();
              return Ok(found);
          }
         else return NotFound("not existance author");
        }
        [HttpPost]
         public async Task<ActionResult<Author>> CreateAuthor(Author author)
         {
            
           _context.authors.Add(author);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = author.AuthorId }, author);
            
            

         }

       
    }
}