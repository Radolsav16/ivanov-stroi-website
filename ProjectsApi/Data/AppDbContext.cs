using Microsoft.EntityFrameworkCore;
using ProjectsApi.Models;

namespace ProjectsApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }

    public DbSet<ProjectImage> ProjectImages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Slug трябва да бъде уникален
        modelBuilder.Entity<Project>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        // Project -> ProjectImage
        modelBuilder.Entity<ProjectImage>()
            .HasOne(image => image.Project)
            .WithMany(project => project.Images)
            .HasForeignKey(image => image.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}