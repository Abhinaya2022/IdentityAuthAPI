using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Course;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.CourseData;

public class CourseDbContext : DbContext
{
    public CourseDbContext()
    {

    }
    public CourseDbContext(DbContextOptions<CourseDbContext> options) : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Instructor> Instructors { get; set; }
    public DbSet<Content> Contents { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>()
           .HasMany(p => p.Contents)
           .WithOne(c => c.Course)
           .HasForeignKey(c => c.CourseId);

    }
}
