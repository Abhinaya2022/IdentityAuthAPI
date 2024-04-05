using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class IdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                User user = new User
                {
                    DisplayName = "Rahul",
                    Email = "rahul@test.com",
                    UserName = "rahul@test.com",
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

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

        }
    }
}
