using API.Dto_s;
using API.Extensions;
using AutoMapper;
using Carter;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.ApplicationModuls
{
    public class UserModule(IMapper mapper) : CarterModule
    {
        private readonly IMapper _mapper = mapper;

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/userbyemail", async (UserManager<User> userManager, [FromQuery] string email) =>
            {
                var user = await userManager.FindUserByEmailWithAddress(email);

                return _mapper.Map<User, UserDto>(user);
            });


            app.MapPost("/register", async (UserManager<User> userManager, [FromBody] RegisterDto registerDto) =>
            {

                var user = new User()
                {
                    Email = registerDto.Email,
                    UserName = registerDto.Email,
                    DisplayName = registerDto.DisplayName,
                };
                return await userManager.CreateAsync(user, registerDto.Password);
            });

            app.MapGet("/users", async (UserManager<User> userManager) =>
            {
                return await userManager.Users.ToListAsync();
            });
        }
    }
}
