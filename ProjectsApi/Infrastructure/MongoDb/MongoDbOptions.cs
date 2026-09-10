using MongoDB.Driver;

namespace ProjectsApi.Infrastructure.MongoDb;

public sealed class MongoDbOptions
{
    public required string ConnectionString { get; init; }
    public required string DatabaseName { get; init; }

    public static MongoDbOptions FromConfiguration(IConfiguration configuration)
    {
        var connectionString = configuration["MONGODB_URI"];
        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("MONGODB_URI is required.");

        _ = new MongoUrl(connectionString);
        var databaseName = configuration["MONGODB_DATABASE"];
        if (string.IsNullOrWhiteSpace(databaseName))
            throw new InvalidOperationException("MONGODB_DATABASE is required.");

        return new MongoDbOptions { ConnectionString = connectionString, DatabaseName = databaseName.Trim() };
    }
}
