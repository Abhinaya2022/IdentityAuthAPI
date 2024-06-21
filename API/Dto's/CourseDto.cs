using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto_s;

public class CourseDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }
    public string Description { get; set; }
    public List<ContentsDto> Contents { get; set; }

}
