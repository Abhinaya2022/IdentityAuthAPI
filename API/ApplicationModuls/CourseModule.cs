using System.Security.Claims;
using API.Dto_s;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Carter;
using Core.Contracts;
using Core.Entities;
using Core.Entities.Course;
using Microsoft.AspNetCore.Identity;

namespace API.ApplicationModuls;

public class CourseModule(IMapper mapper) : ICarterModule
{
    private readonly IMapper _mapper = mapper;

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(
         "add-course",
         async (ClaimsPrincipal claim, UserManager<AppUser> userManager, ICourseRepository repo, CourseDto courseDto) =>
         {
             string email = claim.GetEmail();

             var user = await userManager.FindByEmailAsync(email);
             if (user == null) return Results.NotFound(new ApiErrorResponse(404));

             var course = new Course
             {
                 Name = courseDto.Name,
                 Description = courseDto.Description,
                 Id = 0,
                 Price = courseDto.Price,
                 PictureUrl = courseDto.PictureUrl,
                 InstructorId = user.Id,
                 Contents = courseDto.Contents.Select(x => new Content
                 {
                     Name = x.Name
                 }).ToList(),
             };

             await repo.AddAsync(course);

             return Results.Ok(course);
         }).RequireAuthorization();
    }
}
