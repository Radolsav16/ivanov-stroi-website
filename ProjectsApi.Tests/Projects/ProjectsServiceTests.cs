using ProjectsApi.Features.Projects;

namespace ProjectsApi.Tests.Projects;

public sealed class ProjectsServiceTests
{
    [Fact]
    public async Task GetPage_clamps_invalid_pagination_and_orders_images()
    {
        var repository = new FakeProjectsRepository();
        var result = await new ProjectsService(repository)
            .GetPageAsync(new ProjectsQuery(0, 500), CancellationToken.None);

        Assert.Equal(1, result.Page);
        Assert.Equal(100, result.PageSize);
        Assert.Equal(new[] { "first", "second" }, result.Items[0].Images.Select(image => image.Id));
    }

    private sealed class FakeProjectsRepository : IProjectsRepository
    {
        public Task<(IReadOnlyList<ProjectDocument> Items, long Total)> GetPageAsync(
            ProjectsQuery query,
            CancellationToken cancellationToken)
        {
            IReadOnlyList<ProjectDocument> projects =
            [
                new ProjectDocument
                {
                    Id = "project",
                    Title = "Проект",
                    Images =
                    [
                        new ProjectImageDocument { Id = "second", DisplayOrder = 2 },
                        new ProjectImageDocument { Id = "first", DisplayOrder = 1 }
                    ]
                }
            ];
            return Task.FromResult((projects, 1L));
        }
    }
}
