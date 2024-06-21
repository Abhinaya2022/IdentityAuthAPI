using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Course;

namespace Core.Contracts;

public interface ICourseRepository
{
    Task<Course> AddAsync(Course course);
}
