using ProjectsApi.Features.Contacts;

namespace ProjectsApi.Tests.Contacts;

public sealed class ContactServiceTests
{
    [Fact]
    public async Task Valid_request_is_normalized_and_saved()
    {
        var repository = new FakeContactRepository();
        var service = new ContactService(new ContactRequestValidator(), repository);

        var errors = await service.SubmitAsync(ValidRequest(), CancellationToken.None);

        Assert.Empty(errors);
        Assert.NotNull(repository.Saved);
        Assert.Equal("+359888123456", repository.Saved.Phone);
        Assert.Equal("ivan@example.com", repository.Saved.Email);
    }

    [Fact]
    public async Task Honeypot_request_is_not_saved()
    {
        var repository = new FakeContactRepository();
        var service = new ContactService(new ContactRequestValidator(), repository);
        var request = ValidRequest();
        request = new ContactRequest
        {
            Name = request.Name,
            Phone = request.Phone,
            Email = request.Email,
            Service = request.Service,
            Message = request.Message,
            Website = "spam.example"
        };

        await service.SubmitAsync(request, CancellationToken.None);

        Assert.Null(repository.Saved);
    }

    private static ContactRequest ValidRequest() => new()
    {
        Name = "Иван Иванов",
        Phone = "+359 888 123 456",
        Email = "IVAN@example.com",
        Service = "Ремонт на баня",
        Message = "Искам оглед и оферта за цялостен ремонт на баня."
    };

    private sealed class FakeContactRepository : IContactRepository
    {
        public ContactDocument? Saved { get; private set; }

        public Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken)
        {
            Saved = contact;
            return Task.CompletedTask;
        }
    }
}
