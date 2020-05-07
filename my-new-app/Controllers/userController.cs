using System.Runtime.Intrinsics.X86;
using System;
using System.Reflection.Metadata;
using System.Reflection.Emit;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using System.Xml.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Data;
using my_new_app.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace my_new_app.Controllers
{
    [Route("api/login/google")]
    [ApiController]
    public class userController : Controller
    {
        ApplicationDbContext Context;

        UserManager<ApplicationsUser> userManager;
        public userController(ApplicationDbContext _Context,
                   UserManager<ApplicationsUser> userManager, RoleManager<Role> roleManager)
        {
            this.Context = _Context;
            this.userManager = userManager;

        }
       
        [HttpPost]
        public async Task<IActionResult> FindOrCreat(  [FromBody] ApplicationsUser model)
        {
             var found= await userManager.FindByEmailAsync(model.Email);
             var found1 =await userManager.FindByNameAsync(model.UserName);
           if (found==null)
           {
               var user =new ApplicationsUser
               {
                   UserName= model.Email,
                   Email=model.Email,
                   FullName=model.FullName,
                   PasswordHash="",
               };
                var result = await userManager.CreateAsync(user);
 if (result.Succeeded)
                {
                   
                    return Content("Success");
                }
               return Content("Failure");
           }
           return Content("Exists");
        }
    }

}
