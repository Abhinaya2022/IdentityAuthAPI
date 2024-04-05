using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.AddEndpointsApiExplorer();
            services.AddDbContext<IdentityDbContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("IdentityConnection"));
            });

            services.AddIdentityCore<User>(options =>
            {
                // Add identity options here
            })
            .AddEntityFrameworkStores<IdentityDbContext>()
            .AddSignInManager<SignInManager<User>>();

            services.AddAuthentication();
            services.AddAuthorization();




            return services;
        }
    }
}
