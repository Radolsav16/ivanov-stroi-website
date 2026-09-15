using MongoDB.Driver;
using ProjectsApi.Infrastructure.MongoDb;

namespace ProjectsApi.Features.Contacts;

public sealed class MongoContactRepository(MongoDbContext context) : IContactRepository
{
    public Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken) =>
        context.Contacts.InsertOneAsync(contact, cancellationToken: cancellationToken);

    public Task MarkNotificationSentAsync(string contactId, CancellationToken cancellationToken) =>
        context.Contacts.UpdateOneAsync(
            contact => contact.Id == contactId,
            Builders<ContactDocument>.Update
                .Set(contact => contact.NotificationStatus, "sent")
                .Set(contact => contact.NotifiedAt, DateTime.UtcNow)
                .Set(contact => contact.NotificationLastError, null)
                .Inc(contact => contact.NotificationAttempts, 1),
            cancellationToken: cancellationToken);

    public Task MarkNotificationSkippedAsync(string contactId, CancellationToken cancellationToken) =>
        context.Contacts.UpdateOneAsync(
            contact => contact.Id == contactId,
            Builders<ContactDocument>.Update.Set(contact => contact.NotificationStatus, "disabled"),
            cancellationToken: cancellationToken);

    public Task MarkNotificationFailedAsync(
        string contactId,
        string errorCode,
        CancellationToken cancellationToken) =>
        context.Contacts.UpdateOneAsync(
            contact => contact.Id == contactId,
            Builders<ContactDocument>.Update
                .Set(contact => contact.NotificationStatus, "failed")
                .Set(contact => contact.NotificationLastError, errorCode)
                .Inc(contact => contact.NotificationAttempts, 1),
            cancellationToken: cancellationToken);
}
