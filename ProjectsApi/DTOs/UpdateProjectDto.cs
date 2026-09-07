using System.ComponentModel.DataAnnotations;

namespace ProjectsApi.DTOs;

public class UpdateProjectDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Slug { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Location { get; set; } = string.Empty;

    [Range(2000, 2100)]
    public int Year { get; set; }

    public bool IsFeatured { get; set; }
}