using System.ComponentModel.DataAnnotations;

namespace ProjectsApi.DTOs;

public class CreateProjectImageDto
{
    [Required]
    public string ImageUrl { get; set; } = string.Empty;

    public string AltText { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int DisplayOrder { get; set; }

    public bool IsCover { get; set; }
}