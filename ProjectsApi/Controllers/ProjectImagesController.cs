using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsApi.Data;
using ProjectsApi.DTOs;
using ProjectsApi.Models;

namespace ProjectsApi.Controllers;

[ApiController]
[Route("api/projects/{projectId}/images")]
public class ProjectImagesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectImagesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: /api/projects/{projectId}/images
    [HttpGet]
    public async Task<ActionResult<List<ProjectImageDto>>> GetImages(
        int projectId)
    {
        var projectExists = await _context.Projects
            .AnyAsync(p => p.Id == projectId);

        if (!projectExists)
        {
            return NotFound("Project not found.");
        }

        var images = await _context.ProjectImages
            .Where(i => i.ProjectId == projectId)
            .OrderBy(i => i.DisplayOrder)
            .Select(i => new ProjectImageDto
            {
                Id = i.Id,
                ImageUrl = i.ImageUrl,
                AltText = i.AltText,
                DisplayOrder = i.DisplayOrder,
                IsCover = i.IsCover
            })
            .ToListAsync();

        return Ok(images);
    }

    // POST: /api/projects/{projectId}/images
    [HttpPost]
    public async Task<ActionResult<ProjectImageDto>> CreateImage(
        int projectId,
        CreateProjectImageDto dto)
    {
        var project = await _context.Projects.FindAsync(projectId);

        if (project == null)
        {
            return NotFound("Project not found.");
        }

        var image = new ProjectImage
        {
            ProjectId = projectId,
            ImageUrl = dto.ImageUrl,
            AltText = dto.AltText,
            DisplayOrder = dto.DisplayOrder,
            IsCover = dto.IsCover
        };

        _context.ProjectImages.Add(image);

        await _context.SaveChangesAsync();

        var result = new ProjectImageDto
        {
            Id = image.Id,
            ImageUrl = image.ImageUrl,
            AltText = image.AltText,
            DisplayOrder = image.DisplayOrder,
            IsCover = image.IsCover
        };

        return Ok(result);
    }

    // PUT: /api/projects/{projectId}/images/{imageId}
    [HttpPut("{imageId}")]
    public async Task<ActionResult<ProjectImageDto>> UpdateImage(
        int projectId,
        int imageId,
        UpdateProjectImageDto dto)
    {
        var image = await _context.ProjectImages
            .FirstOrDefaultAsync(i =>
                i.Id == imageId &&
                i.ProjectId == projectId);

        if (image == null)
        {
            return NotFound("Image not found.");
        }

        image.ImageUrl = dto.ImageUrl;
        image.AltText = dto.AltText;
        image.DisplayOrder = dto.DisplayOrder;
        image.IsCover = dto.IsCover;

        await _context.SaveChangesAsync();

        var result = new ProjectImageDto
        {
            Id = image.Id,
            ImageUrl = image.ImageUrl,
            AltText = image.AltText,
            DisplayOrder = image.DisplayOrder,
            IsCover = image.IsCover
        };

        return Ok(result);
    }

    // DELETE: /api/projects/{projectId}/images/{imageId}
    [HttpDelete("{imageId}")]
    public async Task<IActionResult> DeleteImage(
        int projectId,
        int imageId)
    {
        var image = await _context.ProjectImages
            .FirstOrDefaultAsync(i =>
                i.Id == imageId &&
                i.ProjectId == projectId);

        if (image == null)
        {
            return NotFound("Image not found.");
        }

        _context.ProjectImages.Remove(image);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}