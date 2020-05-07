using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using my_new_app.Data;
using my_new_app.Models;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Primitives;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Google;

namespace my_new_app
{
    public class Startup
    {readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"),
                    options => options.SetPostgresVersion(new Version(9, 6))));
      services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
       options.AccessDeniedPath = new PathString("/Account/Access");
        options.Cookie = new CookieBuilder
        {
            //Domain = "",
            HttpOnly = true,
            Name = ".aspNetCoreDemo.Security.Cookie",
            Path = "/",
            SameSite = SameSiteMode.Lax,
            SecurePolicy = CookieSecurePolicy.SameAsRequest
        };
        options.Events = new CookieAuthenticationEvents
        {
            OnSignedIn = context =>
            {
                Console.WriteLine("{0} - {1}: {2}", DateTime.Now,
                    "OnSignedIn", context.Principal.Identity.Name);
                return Task.CompletedTask;
            },
            OnSigningOut = context =>
            {
                Console.WriteLine("{0} - {1}: {2}", DateTime.Now,
                    "OnSigningOut", context.HttpContext.User.Identity.Name);
                return Task.CompletedTask;
            },
            OnValidatePrincipal = context =>
            {
                Console.WriteLine("{0} - {1}: {2}", DateTime.Now,
                    "OnValidatePrincipal", context.Principal.Identity.Name);
                return Task.CompletedTask;
            }
        };
        //options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
        options.LoginPath = new PathString("/Account/Login");
        options.ReturnUrlParameter = "RequestPath";
        options.SlidingExpiration = true;
    });

            IdentityBuilder builder = services.AddIdentityCore<ApplicationsUser>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                // User settings
                options.User.RequireUniqueEmail = true;
                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);

            builder
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddUserStore<ApplicationUserStore>()
                .AddRoleStore<ApplicationRoleStore>()
                .AddRoleValidator<RoleValidator<Role>>()
                .AddRoleManager<RoleManager<Role>>()
                .AddUserManager<UserManager<ApplicationsUser>>()
                .AddSignInManager<SignInManager<ApplicationsUser>>();


            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Ngay xua co mot con bo..."));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = true,
                        ValidIssuer = "RS",
                        ValidateAudience = true,
                        ValidAudience = "RS",
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                });
services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = GoogleDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
            .AddGoogle(options =>
            {
                options.ClientId = "[945688556250-ksjktjeqjib4p0so169o35abfmdsjpc2.apps.googleusercontent.com]";
                options.ClientSecret = "[ynljByvz_R9Mzpt365JMh7pX]";
                
            });
services.AddCors(options =>
        {
            options.AddPolicy("Policy1",
                builder =>
                {
                    builder.WithOrigins("https://localhost:5001/api/login/google"
                                        );
                });
        
        });
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

             



            app.UseRouting();
             app.UseCors();
          
            app.UseAuthorization();
          app.UseAuthentication();
        

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "token",
                    pattern: "token",
                    defaults: new { controller = "token", action = "token" });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
