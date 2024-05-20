using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class IdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {

            if (!roleManager.Roles.Any())
            {
                var roles = new List<AppRole>
                                {
                                    new() { Name = "Admin"},
                                    new() { Name = "Member"},
                                    new() { Name = "Reviewer"},
                                    new() { Name = "Approver"},
                                };

                for (int i = 0; i < roles.Count; i++)
                {
                    await roleManager.CreateAsync(roles[i]);
                };
            }



            if (!userManager.Users.Any())
            {
                AppUser user = new()
                {
                    DisplayName = "Rahul",
                    Email = "rahul@test.com",
                    UserName = "rahul@test.com",
                    CreatedOn = DateTime.UtcNow,
                    Address = new Address
                    {
                        FirstName = "Rahul",
                        LastName = "Kumar",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        ZipCode = "90210"
                    }
                };

                var result = await userManager.CreateAsync(user, "Pa$$w0rd");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "Member");
                }

                AppUser admin = new AppUser() { UserName = "admin@test.com", Email = "admin@test.com",DisplayName="Admin", CreatedOn = DateTime.UtcNow };

                var adminAdded = await userManager.CreateAsync(admin, "admin");

                if (adminAdded.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
