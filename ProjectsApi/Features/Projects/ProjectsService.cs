namespace ProjectsApi.Features.Projects;

public sealed class ProjectsService(IProjectsRepository repository)
{
    public async Task<ProjectsPageResponse> GetPageAsync(
        ProjectsQuery requestedQuery,
        CancellationToken cancellationToken)
    {
        var query = requestedQuery with
        {
            Page = Math.Max(requestedQuery.Page, 1),
            PageSize = Math.Clamp(requestedQuery.PageSize, 1, 100)
        };
        var (items, total) = await repository.GetPageAsync(query, cancellationToken);
        return new ProjectsPageResponse(
            items.Select(ToResponse).ToList(),
            query.Page,
            query.PageSize,
            total,
            (int)Math.Ceiling(total / (double)query.PageSize));
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
