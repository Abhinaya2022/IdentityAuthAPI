using System.Security.Claims;
using API.Dto_s;
using API.Errors;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Carter;
using Core.Contracts;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.ApplicationModuls
{
    public class UserModule(IMapper mapper, ITokenService token) : CarterModule
    {
        private readonly IMapper _mapper = mapper;

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet(
                "get-current-user",
                async (UserManager<AppUser> userManager, ClaimsPrincipal claimsPrincipal) =>
                {
                    string email = claimsPrincipal.GetEmail();

                    var user = await userManager.FindByEmailAsync(email);

                    if (user == null) return Results.BadRequest(new ApiErrorResponse(401));

                    return Results.Ok(new UserDto()
                    {
                        DisplayName = user.DisplayName,
                        Email = user.Email,
                        Token = token.CreateToken(user)
                    });
                }
            ).RequireAuthorization();

            app.MapGet(
                "is-email-exists",
                async (UserManager<AppUser> userManager, [FromQuery] string email) =>
                {
                    var user = await userManager.FindByEmailAsync(email);

                    dynamic result = user != null ? true : false;
                    return result;
                }
            );

            app.MapPost(
                "/register",
                async (UserManager<AppUser> userManager, [FromBody] RegisterDto registerDto) =>
                {
                    var user = new AppUser()
                    {
                        Email = registerDto.Email,
                        UserName = registerDto.Email,
                        DisplayName = registerDto.DisplayName,
                    };
                    var isRegistered = await userManager.CreateAsync(user, registerDto.Password);

                    if (isRegistered.Succeeded)
                    {
                        var isRoleAdded = await userManager.AddToRoleAsync(user, "Member");
                        if (isRoleAdded.Succeeded)
                        {
                            return Results.Ok(
                                new UserDto
                                {
                                    Email = user.Email,
                                    DisplayName = user.DisplayName,
                                    Token = token.CreateToken(user)
                                });
                        }
                    }
                    return Results
                            .BadRequest(new ApiErrorResponse(400, isRegistered.Errors.FirstOrDefault()?.Description));
                }
            );

            app.MapGet(
                    "/users",
                    async (UserManager<AppUser> userManager) =>
                    {
                        var users = await userManager.Users
                            .ProjectTo<UserReturnDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();

                        dynamic result =
                            users.Count != 0 ? users : Results.NotFound(new ApiErrorResponse(404));
                        return result;
                    }
                ).RequireAuthorization();

            app.MapPost(
                    "/add-address",
                    async (
                        UserManager<AppUser> userManager,
                        HttpContext context,
                        AddressDto addressDto
                    ) =>
                    {
                        var email = context.User.GetEmail();

                        var user = await userManager.FindUserByEmailWithAddress(email);
                        if (user != null)
                        {
                            user.Address = _mapper.Map<Address>(addressDto);
                            await userManager.UpdateAsync(user);
                        }

                        return new ApiErrorResponse(200);
                    }
                ).RequireAuthorization();

            app.MapGet(
                    "/get-address",
                    async (UserManager<AppUser> userManager, HttpContext context) =>
                    {
                        dynamic response = new ApiErrorResponse(404);

                        var email = context.User.GetEmail();

                        var user = await userManager.FindUserByEmailWithAddress(email);
                        if (user.Address != null)
                        {
                            response = _mapper.Map<AppUser, AddressDto>(user);
                        }

                        return response;
                    }
                ).RequireAuthorization();

            app.MapPost(
                "/login",
                async (
                    UserManager<AppUser> userManager,
                    SignInManager<AppUser> signInManager,
                    LoginDto loginDto
                ) =>
                {
                    if (string.IsNullOrEmpty(loginDto.Email)) return Results.BadRequest(new ApiErrorResponse(401, "Email is invalid!"));

                    var user = await userManager.FindByEmailAsync(loginDto.Email);


                    if (user != null)
                    {
                        var result = await signInManager.CheckPasswordSignInAsync(
                            user,
                            loginDto.Password,
                            true
                        );

                        if (!result.Succeeded)
                        {
                            return Results.BadRequest(new ApiErrorResponse(401, "Password is invalid!"));
                        }
                        else
                        {
                            return Results.Ok(new UserDto
                            {
                                Email = user.Email,
                                DisplayName = user.DisplayName,
                                Token = token.CreateToken(user),
                            });
                        }
                    }

                    return Results.BadRequest();
                }
            );
        }
    }
}
