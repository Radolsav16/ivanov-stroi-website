using System.Text.RegularExpressions;
using MongoDB.Bson;
using MongoDB.Driver;
using ProjectsApi.Infrastructure.MongoDb;

namespace ProjectsApi.Features.Projects;

public sealed class MongoProjectsRepository(MongoDbContext context) : IProjectsRepository
{
    public async Task<(IReadOnlyList<ProjectDocument> Items, long Total)> GetPageAsync(
        ProjectsQuery query,
        CancellationToken cancellationToken)
    {
        var filters = new List<FilterDefinition<ProjectDocument>>();
        if (query.Year.HasValue)
            filters.Add(Builders<ProjectDocument>.Filter.Eq(project => project.Year, query.Year.Value));
        if (query.Featured.HasValue)
            filters.Add(Builders<ProjectDocument>.Filter.Eq(project => project.IsFeatured, query.Featured.Value));
        if (!string.IsNullOrWhiteSpace(query.Location))
            filters.Add(Builders<ProjectDocument>.Filter.Regex(
                project => project.Location,
                new BsonRegularExpression(Regex.Escape(query.Location.Trim()), "i")));

        var filter = filters.Count == 0
            ? Builders<ProjectDocument>.Filter.Empty
            : Builders<ProjectDocument>.Filter.And(filters);
        var total = await context.Projects.CountDocumentsAsync(filter, cancellationToken: cancellationToken);
        var items = await context.Projects.Find(filter)
            .SortByDescending(project => project.CreatedAt)
            .Skip((query.Page - 1) * query.PageSize)
            .Limit(query.PageSize)
            .ToListAsync(cancellationToken);
        return (items, total);
    }
}
