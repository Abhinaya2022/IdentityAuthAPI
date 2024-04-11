using API.Errors;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByEmailWithAddress(this UserManager<AppUser> manager, string email)
        {
            return await manager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.Email == email) ?? null;
        }
    }
}
