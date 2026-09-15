namespace ProjectsApi.Features.Contacts;

public interface IContactNotifier
{
    Task<bool> SendAsync(ContactDocument contact, CancellationToken cancellationToken);
}
