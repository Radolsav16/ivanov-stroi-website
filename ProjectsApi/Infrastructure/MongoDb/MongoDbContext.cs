using MongoDB.Driver;
using ProjectsApi.Features.Contacts;
using ProjectsApi.Features.Projects;

namespace ProjectsApi.Infrastructure.MongoDb;

public sealed class MongoDbContext(IMongoClient client, MongoDbOptions options)
{
    private readonly IMongoDatabase _database = client.GetDatabase(options.DatabaseName);

    public IMongoCollection<ContactDocument> Contacts =>
        _database.GetCollection<ContactDocument>("contactrequests");

    public IMongoCollection<ProjectDocument> Projects =>
        _database.GetCollection<ProjectDocument>("projects");
}
