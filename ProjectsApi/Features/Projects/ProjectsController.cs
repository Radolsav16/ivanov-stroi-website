using Microsoft.AspNetCore.Mvc;

namespace ProjectsApi.Features.Projects;

[ApiController]
[Route("api/projects")]
public sealed class ProjectsController(ProjectsService service) : ControllerBase
{
    [HttpGet]
    public Task<ProjectsPageResponse> GetProjects(
        [FromQuery] ProjectsQuery query,
        CancellationToken cancellationToken) =>
        service.GetPageAsync(query, cancellationToken);
}
