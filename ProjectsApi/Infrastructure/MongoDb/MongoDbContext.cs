using MongoDB.Driver;
using ProjectsApi.Features.Projects;

namespace ProjectsApi.Infrastructure.MongoDb;

public sealed class MongoDbContext(IMongoClient client, MongoDbOptions options)
{
    private readonly IMongoDatabase _database = client.GetDatabase(options.DatabaseName);

    public IMongoCollection<ProjectDocument> Projects =>
        _database.GetCollection<ProjectDocument>("projects");
}
