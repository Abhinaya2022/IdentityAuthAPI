using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Course;

public class Instructor
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PictureUrl { get; set; }
    public string About { get; set; }
    public int Experience { get; set; }
    public ICollection<Course> Courses { get; set; } // Added collection for courses

}
