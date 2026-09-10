namespace ProjectsApi.Features.Projects;

public interface IProjectsRepository
{
    Task<(IReadOnlyList<ProjectDocument> Items, long Total)> GetPageAsync(
        ProjectsQuery query,
        CancellationToken cancellationToken);
}
