namespace ProjectsApi.Features.Contacts;

public interface IContactRepository
{
    Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken);
    Task MarkNotificationSentAsync(string contactId, CancellationToken cancellationToken);
    Task MarkNotificationSkippedAsync(string contactId, CancellationToken cancellationToken);
    Task MarkNotificationFailedAsync(string contactId, string errorCode, CancellationToken cancellationToken);
}
