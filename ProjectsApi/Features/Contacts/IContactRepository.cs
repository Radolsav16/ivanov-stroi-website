namespace ProjectsApi.Features.Contacts;

public interface IContactRepository
{
    Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken);
}
