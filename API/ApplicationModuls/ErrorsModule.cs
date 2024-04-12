using API.Errors;
using Carter;
using Microsoft.AspNetCore.Mvc;

namespace API.ApplicationModuls
{
    public class ErrorsModule : CarterModule
    {

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.Map("/errors/{code}", (int code) =>
            {
                return new ApiErrorResponse(code);
            });
        }
    }
}
