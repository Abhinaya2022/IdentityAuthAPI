using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Contracts;
using Core.Entities.Course;
using Infrastructure.Data.CourseData;

namespace Infrastructure.Implementaions;

public class CourseRepository(CourseDbContext dbContext) : ICourseRepository
{
    private readonly CourseDbContext _context = dbContext;
    public async Task<Course> AddAsync(Course course)
    {
        await _context.Courses.AddAsync(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public Task<IEnumerable<Course>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Course> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Course> GetAsync(string name)
    {
        throw new NotImplementedException();
    }
}
