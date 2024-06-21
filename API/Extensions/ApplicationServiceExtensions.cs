using API.Errors;
using Carter;
using Core.Contracts;
using Infrastructure.Data;
using Infrastructure.Data.CourseData;
using Infrastructure.Implementaions;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        /// <summary>
        /// Application services
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns></returns>
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
            services.AddDbContext<CourseDbContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("CourseConnection"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy(
                    "CorsPolicy",
                    builder =>
                    {
                        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                    }
                );
            });

            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<ICourseRepository, CourseRepository>();
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage)
                        .ToArray();

                    var errorResponse = new ApiValidationErrorResponse { Errors = errors };

                    return new BadRequestObjectResult(errorResponse);
                };
            });          

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }

        /// <summary>
        /// Application pipes
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseApplicationServices(this IApplicationBuilder app)
        {
            app.UseStatusCodePagesWithReExecute("/errors/{0}");
            app.UseSwaggerDocumentation();                    
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            return app;
        }
    }
}
