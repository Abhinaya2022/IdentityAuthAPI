using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Course;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }
    public string Description { get; set; }
    public int InstructorId { get; set; }
    public Instructor Instructor { get; set; }
    public ICollection<Content> Contents { get; set; } // Added collection for contents

}
