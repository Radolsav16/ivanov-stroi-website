using MongoDB.Bson;
using MongoDB.Driver;

namespace ProjectsApi.Infrastructure.MongoDb;

public sealed class MongoDbReadinessService(IMongoClient client)
{
    public async Task<bool> IsReadyAsync(CancellationToken cancellationToken)
    {
        try
        {
            await client.GetDatabase("admin").RunCommandAsync<BsonDocument>(
                new BsonDocument("ping", 1), cancellationToken: cancellationToken);
            return true;
        }
        catch (Exception exception) when (exception is MongoException or TimeoutException)
        {
            return false;
        }
    }
}
