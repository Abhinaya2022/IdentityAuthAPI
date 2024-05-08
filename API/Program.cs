using API.Extensions;
using API.Middlewares;
using Carter;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddApplicationServices(builder.Configuration);
        builder.Services.AddIdentityService(builder.Configuration);
        builder.Services.AddSwaggerDocumentation();

        var app = builder.Build();
        // Configure the HTTP request pipeline.
        app.UseMiddleware<ApiExceptionMiddleware>();
        app.UseApplicationServices();
        app.MapCarter();
        app.MapControllers();

        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var identityContext = services.GetRequiredService<IdentityDbContext>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var logger = services.GetRequiredService<ILogger<Program>>();
        try
        {
            await identityContext.Database.MigrateAsync();
            await IdentityDbContextSeed.SeedUserAsync(userManager);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occured during migration");
        }

        app.Run();
    }
}
