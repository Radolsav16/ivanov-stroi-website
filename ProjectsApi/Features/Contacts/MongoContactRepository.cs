using MongoDB.Driver;
using ProjectsApi.Infrastructure.MongoDb;

namespace ProjectsApi.Features.Contacts;

public sealed class MongoContactRepository(MongoDbContext context) : IContactRepository
{
    public Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken) =>
        context.Contacts.InsertOneAsync(contact, cancellationToken: cancellationToken);
}
