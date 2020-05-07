using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using my_new_app.Data;

namespace my_new_app.Models
{
    public class ApplicationsUser : IdentityUser<int>
    {
        [MaxLength(50)]
        public string FullName { get; set; }
        [MaxLength(20)]
        public string Address { get; set; }
        public ICollection<Book> books{get;set;}
       

    }
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> Users { get; set; }

        public virtual ICollection<IdentityRoleClaim<int>> Claims { get; set; }
    }

    public class UserRole : IdentityUserRole<int>
    {

        public virtual Role Role { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationsUser User { get; set; }
    }
     public class UserLogin:IdentityUserLogin<int>
     {
          [ForeignKey("UserId")]
          public virtual ApplicationsUser User{get;set;}
        
     }

    /* user and role stores */
    public class ApplicationUserStore : UserStore<ApplicationsUser, Role, ApplicationDbContext, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityUserToken<int>, IdentityRoleClaim<int>>
    {
        public ApplicationUserStore(ApplicationDbContext db, IdentityErrorDescriber describer = null) : base(db, describer) { }
    }

    public class ApplicationRoleStore : RoleStore<Role, ApplicationDbContext, int, UserRole, IdentityRoleClaim<int>>
    {
        public ApplicationRoleStore(ApplicationDbContext db, IdentityErrorDescriber describer = null) : base(db, describer)
        {

        }
    }
}
