using MongoDB.Driver;
using ProjectsApi.Features.Projects;

namespace ProjectsApi.Infrastructure.MongoDb;

public sealed class MongoDbIndexesHostedService(
    MongoDbContext context,
    ILogger<MongoDbIndexesHostedService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await context.Projects.Indexes.CreateOneAsync(
                    new CreateIndexModel<ProjectDocument>(
                        Builders<ProjectDocument>.IndexKeys.Ascending(project => project.Slug),
                        new CreateIndexOptions { Unique = true, Name = "projects_slug_unique" }),
                    cancellationToken: stoppingToken);

                logger.LogInformation("MongoDB indexes are ready");
                return;
            }
            catch (Exception exception) when (exception is MongoException or TimeoutException)
            {
                logger.LogWarning(exception, "MongoDB indexes are not ready; retrying in one minute");
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}
