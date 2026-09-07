namespace ProjectsApi.DTOs;

public class ProjectDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public int Year { get; set; }

    public bool IsFeatured { get; set; }

    public DateTime CreatedAt { get; set; }

    public List<ProjectImageDto> Images { get; set; } = new();
}