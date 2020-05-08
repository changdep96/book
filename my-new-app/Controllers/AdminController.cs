using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using my_new_app.Data;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/login/admin")]
    [ApiController]
    public class AdminController : Controller
    {
        ApplicationDbContext dbContext;
        UserManager<ApplicationsUser> userManager;
        RoleManager<Role> roleManager;
        
       

        public AdminController(ApplicationDbContext dbContext,
            UserManager<ApplicationsUser> userManager, RoleManager<Role> roleManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }
        [HttpPost]
    public async Task<IActionResult> Init()
        {
            if (!await dbContext.Users.AnyAsync())
            {
                var roleResult = await roleManager.CreateAsync(new Role
                {
                    Name = "Administrators"
                });


                var user = new ApplicationsUser
                {
                    UserName = "changdep",
                    Email = "changdep@gmail.com",
                    FullName = "Administrator",
                    
                };

                var result = await userManager.CreateAsync(user, "chang@123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "Administrators");

                    return Content("Success");
                }
                return Content("Failure");
            }
            return Content("Exists");
        }
  
 
     
 

      

}
}
