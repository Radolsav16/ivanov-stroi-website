using Microsoft.Extensions.Logging.Abstractions;
using ProjectsApi.Features.Contacts;

namespace ProjectsApi.Tests.Contacts;

public sealed class ContactServiceTests
{
    [Fact]
    public async Task Valid_request_is_normalized_and_saved()
    {
        var repository = new FakeContactRepository();
        var notifier = new FakeContactNotifier();
        var service = CreateService(repository, notifier);

        var errors = await service.SubmitAsync(ValidRequest(), CancellationToken.None);

        Assert.Empty(errors);
        Assert.NotNull(repository.Saved);
        Assert.Equal("+359888123456", repository.Saved.Phone);
        Assert.Equal("ivan@example.com", repository.Saved.Email);
        Assert.Same(repository.Saved, notifier.Sent);
        Assert.Equal("sent", repository.NotificationStatus);
    }

    [Fact]
    public async Task Honeypot_request_is_not_saved()
    {
        var repository = new FakeContactRepository();
        var notifier = new FakeContactNotifier();
        var service = CreateService(repository, notifier);
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
        Assert.Null(notifier.Sent);
    }

    [Fact]
    public async Task Notification_failure_does_not_lose_the_saved_request()
    {
        var repository = new FakeContactRepository();
        var notifier = new FakeContactNotifier { Failure = new HttpRequestException("Provider unavailable") };
        var service = CreateService(repository, notifier);

        var errors = await service.SubmitAsync(ValidRequest(), CancellationToken.None);

        Assert.Empty(errors);
        Assert.NotNull(repository.Saved);
        Assert.Equal("failed", repository.NotificationStatus);
        Assert.Equal(nameof(HttpRequestException), repository.NotificationErrorCode);
    }

    private static ContactService CreateService(
        IContactRepository repository,
        IContactNotifier notifier) =>
        new(new ContactRequestValidator(), repository, notifier, NullLogger<ContactService>.Instance);

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
        public string? NotificationStatus { get; private set; }
        public string? NotificationErrorCode { get; private set; }

        public Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken)
        {
            Saved = contact;
            return Task.CompletedTask;
        }

        public Task MarkNotificationSentAsync(string contactId, CancellationToken cancellationToken)
        {
            NotificationStatus = "sent";
            return Task.CompletedTask;
        }

        public Task MarkNotificationSkippedAsync(string contactId, CancellationToken cancellationToken)
        {
            NotificationStatus = "disabled";
            return Task.CompletedTask;
        }

        public Task MarkNotificationFailedAsync(
            string contactId,
            string errorCode,
            CancellationToken cancellationToken)
        {
            NotificationStatus = "failed";
            NotificationErrorCode = errorCode;
            return Task.CompletedTask;
        }
    }

    private sealed class FakeContactNotifier : IContactNotifier
    {
        public ContactDocument? Sent { get; private set; }
        public Exception? Failure { get; init; }

        public Task<bool> SendAsync(ContactDocument contact, CancellationToken cancellationToken)
        {
            Sent = contact;
            return Failure is null ? Task.FromResult(true) : Task.FromException<bool>(Failure);
        }
    }
}
