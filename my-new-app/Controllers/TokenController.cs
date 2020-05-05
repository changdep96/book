using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using my_new_app.Data;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    public class TokenController : Controller
    {
        ApplicationDbContext dbContext;
        UserManager<ApplicationsUser> userManager;
        RoleManager<Role> roleManager;

        public TokenController(ApplicationDbContext dbContext,
            UserManager<ApplicationsUser> userManager, RoleManager<Role> roleManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpPost]
        public async Task<IActionResult> Token([FromBody] UserLogin model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);

            // nếu người dùng không tồn tại
            if (user == null)
            {
                return BadRequest(new
                {
                    error = "user hay password wrong"
                });
            }

            var passOk = await userManager.CheckPasswordAsync(user, model.Password);

            // nếu mật khẩu không đúng
            if (passOk == false)
            {
                return BadRequest(new
                {
                    error = "user hay password wrong"
                });
            }

            // nếu user và pass đúng => sinh token

            var now = DateTime.UtcNow;

            var roles = roleManager.Roles.Where(r =>
                r.Users.Any(u => u.UserId == user.Id)
            ).Select(r => r.Name).ToList();

            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,  user.Id.ToString()),
                new Claim(ClaimTypes.Name,  "cookie authen"),
                new Claim(ClaimTypes.Email, model.UserName),
                new Claim("AspNet.Identity.SecurityStamp",  user.SecurityStamp),
                new Claim(JwtRegisteredClaimNames.Sub,  user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.Now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new Claim(ClaimTypes.Name,user.UserName),
            new Claim("FullName", user.FullName),
            new Claim(ClaimTypes.Role,"")

            };
          var claimsIdentity = new ClaimsIdentity(
    claims, CookieAuthenticationDefaults.AuthenticationScheme);

var authProperties = new AuthenticationProperties
{
    //AllowRefresh = <bool>,
    // Refreshing the authentication session should be allowed.

    //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
    // The time at which the authentication ticket expires. A 
    // value set here overrides the ExpireTimeSpan option of 
    // CookieAuthenticationOptions set with AddCookie.

    //IsPersistent = true,
    // Whether the authentication session is persisted across 
    // multiple requests. When used with cookies, controls
    // whether the cookie's lifetime is absolute (matching the
    // lifetime of the authentication ticket) or session-based.

    //IssuedUtc = <DateTimeOffset>,
    // The time at which the authentication ticket was issued.

    //RedirectUri = <string>
    // The full path or absolute URI to be used as an http 
    // redirect response value.
};

await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme, 
    new ClaimsPrincipal(claimsIdentity), 
    authProperties);
            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            var expires = now.Add(TimeSpan.FromDays(15));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Ngay xua co mot con bo..."));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // creat cookis


            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: "RS",
                audience: "RS",
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: creds
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Json(new
            {
                access_token = encodedJwt,
                expires_in = expires
            });
        }
    }

    public class UserLogin
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}