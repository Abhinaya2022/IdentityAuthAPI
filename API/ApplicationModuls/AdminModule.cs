using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carter;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ApplicationModuls;

public class AdminModule : CarterModule
{

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(
             "users-with-roles", async (UserManager<AppUser> userManger) =>
             {
                 var users = await userManger
                             .Users
                             .OrderBy(u => u.UserName)
                             .Select(u => new
                             {
                                 u.Id,
                                 Username = u.UserName,
                                 Roles = u.UserRoles.Select(u => u.Role.Name).ToList()
                             })
                             .ToListAsync();

                 return Results.Ok(users);
             }
        ).RequireAuthorization(policyNames: "RequireAdminRole");

    }
}
