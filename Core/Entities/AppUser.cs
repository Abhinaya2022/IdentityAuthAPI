using Microsoft.AspNetCore.Identity;
using System.Net.Sockets;

namespace Core.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
        public DateTime DateOfBirth { get; set; } = DateTime.UtcNow;
        public string KnownAs { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
