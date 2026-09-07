using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsApi.Data;
using ProjectsApi.DTOs;
using ProjectsApi.Models;

namespace ProjectsApi.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: /api/projects
    [HttpGet]
    public async Task<ActionResult<PaginationDto<ProjectDto>>> GetProjects(
        int page = 1,
        int pageSize = 10,
        int? year = null,
        bool? featured = null,
        string? location = null)
    {
        // Проверка на page
        if (page < 1)
        {
            page = 1;
        }

        // Ограничаваме pageSize
        if (pageSize < 1)
        {
            pageSize = 10;
        }

        if (pageSize > 100)
        {
            pageSize = 100;
        }

        // Започваме заявката
        var query = _context.Projects.AsQueryable();

        // Филтър по година
        if (year.HasValue)
        {
            query = query.Where(p => p.Year == year.Value);
        }

        // Филтър по featured
        if (featured.HasValue)
        {
            query = query.Where(p => p.IsFeatured == featured.Value);
        }

        // Филтър по location
        if (!string.IsNullOrWhiteSpace(location))
        {
            query = query.Where(p =>
                p.Location.ToLower().Contains(location.ToLower()));
        }

        // Общо проекти след филтрите
        var totalItems = await query.CountAsync();

        // Общо страници
        var totalPages = (int)Math.Ceiling(
            totalItems / (double)pageSize);

        // Вземаме само проектите за текущата страница
        var projects = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Description = p.Description,
                Location = p.Location,
                Year = p.Year,
                IsFeatured = p.IsFeatured,
                CreatedAt = p.CreatedAt,

                Images = p.Images
                    .OrderBy(i => i.DisplayOrder)
                    .Select(i => new ProjectImageDto
                    {
                        Id = i.Id,
                        ImageUrl = i.ImageUrl,
                        AltText = i.AltText,
                        DisplayOrder = i.DisplayOrder,
                        IsCover = i.IsCover
                    })
                    .ToList()
            })
            .ToListAsync();

        return Ok(new PaginationDto<ProjectDto>
        {
            Items = projects,
            Page = page,
            PageSize = pageSize,
            TotalItems = totalItems,
            TotalPages = totalPages
        });
    }

    // GET: /api/projects/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProject(int id)
    {
        var project = await _context.Projects
            .Where(p => p.Id == id)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Description = p.Description,
                Location = p.Location,
                Year = p.Year,
                IsFeatured = p.IsFeatured,
                CreatedAt = p.CreatedAt,

                Images = p.Images
                    .OrderBy(i => i.DisplayOrder)
                    .Select(i => new ProjectImageDto
                    {
                        Id = i.Id,
                        ImageUrl = i.ImageUrl,
                        AltText = i.AltText,
                        DisplayOrder = i.DisplayOrder,
                        IsCover = i.IsCover
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    // GET: /api/projects/slug/{slug}
    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ProjectDto>> GetProjectBySlug(string slug)
    {
        var project = await _context.Projects
            .Where(p => p.Slug == slug)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Description = p.Description,
                Location = p.Location,
                Year = p.Year,
                IsFeatured = p.IsFeatured,
                CreatedAt = p.CreatedAt,

                Images = p.Images
                    .OrderBy(i => i.DisplayOrder)
                    .Select(i => new ProjectImageDto
                    {
                        Id = i.Id,
                        ImageUrl = i.ImageUrl,
                        AltText = i.AltText,
                        DisplayOrder = i.DisplayOrder,
                        IsCover = i.IsCover
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    // POST: /api/projects
    [HttpPost]
    public async Task<ActionResult<ProjectDto>> CreateProject(
        CreateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Slug = dto.Slug,
            Description = dto.Description,
            Location = dto.Location,
            Year = dto.Year,
            IsFeatured = dto.IsFeatured,
            CreatedAt = DateTime.UtcNow
        };

        _context.Projects.Add(project);

        await _context.SaveChangesAsync();

        var result = new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Slug = project.Slug,
            Description = project.Description,
            Location = project.Location,
            Year = project.Year,
            IsFeatured = project.IsFeatured,
            CreatedAt = project.CreatedAt,
            Images = new List<ProjectImageDto>()
        };

        return CreatedAtAction(
            nameof(GetProject),
            new { id = project.Id },
            result);
    }

    // PUT: /api/projects/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectDto>> UpdateProject(
        int id,
        UpdateProjectDto dto)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        project.Title = dto.Title;
        project.Slug = dto.Slug;
        project.Description = dto.Description;
        project.Location = dto.Location;
        project.Year = dto.Year;
        project.IsFeatured = dto.IsFeatured;

        await _context.SaveChangesAsync();

        var result = new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Slug = project.Slug,
            Description = project.Description,
            Location = project.Location,
            Year = project.Year,
            IsFeatured = project.IsFeatured,
            CreatedAt = project.CreatedAt,
            Images = new List<ProjectImageDto>()
        };

        return Ok(result);
    }

    // DELETE: /api/projects/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}