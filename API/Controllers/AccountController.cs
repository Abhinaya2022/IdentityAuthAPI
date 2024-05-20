using API.Dto_s;
using API.Errors;
using API.Extensions;
using Core.Contracts;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// public class AccountController(
//     UserManager<AppUser> userManager,
//     ITokenService tokenService
// ) : BaseController
// {
//     private readonly UserManager<AppUser> _userManager = userManager;
//     private readonly ITokenService _tokenService = tokenService;

//     [HttpGet]
//     [Authorize]
//     public async Task<IActionResult> GetCurrentUser()
//     {
//         string email = User.GetEmail();

//         var user = await this._userManager.FindByEmailAsync(email);
//         if (user == null)
//             return Unauthorized(new ApiErrorResponse(401));

//         return Ok(
//             new UserDto
//             {
//                 DisplayName = user.DisplayName,
//                 Email = email,
//                 Token = _tokenService.CreateToken(user)
//             }
//         );
//     }
// }
