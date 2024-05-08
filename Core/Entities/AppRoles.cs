using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class AppRoles : IdentityRole
{
    public int LevelId { get; private set; }
    public int ApplicationId { get; set; }
    public string Description { get; private set; }

    
}