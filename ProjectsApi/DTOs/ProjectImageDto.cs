namespace ProjectsApi.DTOs;

public class ProjectImageDto
{
    public int Id { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public string AltText { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsCover { get; set; }
}