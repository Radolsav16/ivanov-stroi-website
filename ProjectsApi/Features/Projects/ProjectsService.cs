namespace ProjectsApi.Features.Projects;

public sealed class ProjectsService(IProjectsRepository repository)
{
    public async Task<ProjectsPageResponse> GetPageAsync(
        ProjectsQuery requestedQuery,
        CancellationToken cancellationToken)
    {
        var query = requestedQuery with
        {
            Page = Math.Clamp(requestedQuery.Page, 1, 10_000),
            PageSize = Math.Clamp(requestedQuery.PageSize, 1, 100),
            Location = NormalizeLocation(requestedQuery.Location)
        };
        var (items, total) = await repository.GetPageAsync(query, cancellationToken);
        return new ProjectsPageResponse(
            items.Select(ToResponse).ToList(),
            query.Page,
            query.PageSize,
            total,
            (int)Math.Ceiling(total / (double)query.PageSize));
    }

    private static string? NormalizeLocation(string? location)
    {
        if (string.IsNullOrWhiteSpace(location)) return null;
        var normalized = location.Trim();
        return normalized[..Math.Min(normalized.Length, 80)];
    }

    private static ProjectResponse ToResponse(ProjectDocument project) => new(
        project.Id,
        project.Title,
        project.Slug,
        project.Description,
        project.Location,
        project.Year,
        project.IsFeatured,
        project.CreatedAt,
        project.Images.OrderBy(image => image.DisplayOrder).Select(image => new ProjectImageResponse(
            image.Id, image.ImageUrl, image.AltText, image.DisplayOrder, image.IsCover)).ToList());
}
