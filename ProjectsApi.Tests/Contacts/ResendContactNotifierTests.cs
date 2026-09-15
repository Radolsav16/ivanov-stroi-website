using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Logging.Abstractions;
using ProjectsApi.Features.Contacts;
using ProjectsApi.Infrastructure.Email;

namespace ProjectsApi.Tests.Contacts;

public sealed class ResendContactNotifierTests
{
    [Fact]
    public async Task Enabled_notifier_sends_expected_request()
    {
        var handler = new RecordingHandler();
        var notifier = CreateNotifier(handler, enabled: true);
        var contact = CreateContact();

        var sent = await notifier.SendAsync(contact, CancellationToken.None);

        Assert.True(sent);
        Assert.Equal(HttpMethod.Post, handler.Method);
        Assert.Equal("https://api.resend.com/emails", handler.RequestUri?.ToString());
        Assert.Equal("Bearer", handler.AuthorizationScheme);
        Assert.Equal("secret-key", handler.AuthorizationParameter);
        Assert.Equal($"contact-{contact.Id}", handler.IdempotencyKey);
        using var payload = JsonDocument.Parse(handler.Body);
        Assert.Equal(
            "krasenivanov21@gmail.com",
            payload.RootElement.GetProperty("to")[0].GetString());
        Assert.Equal("visitor@example.com", payload.RootElement.GetProperty("reply_to").GetString());
        Assert.Contains("Ремонт на баня", payload.RootElement.GetProperty("subject").GetString());
    }

    [Fact]
    public async Task Disabled_notifier_does_not_contact_provider()
    {
        var handler = new RecordingHandler();
        var notifier = CreateNotifier(handler, enabled: false);

        var sent = await notifier.SendAsync(CreateContact(), CancellationToken.None);

        Assert.False(sent);
        Assert.Null(handler.Method);
    }

    private static ResendContactNotifier CreateNotifier(RecordingHandler handler, bool enabled)
    {
        var client = new HttpClient(handler) { BaseAddress = new Uri("https://api.resend.com/") };
        return new ResendContactNotifier(
            client,
            new ContactEmailOptions
            {
                Enabled = enabled,
                ApiKey = "secret-key",
                From = "IVANOV STROI <zapitvane@notifications.example.com>",
                Recipient = "krasenivanov21@gmail.com"
            },
            NullLogger<ResendContactNotifier>.Instance);
    }

    private static ContactDocument CreateContact() => new()
    {
        Name = "Иван Иванов",
        Phone = "+359888123456",
        Email = "visitor@example.com",
        Service = "Ремонт на баня",
        Message = "Желая оглед и подробна оферта за ремонт на баня."
    };

    private sealed class RecordingHandler : HttpMessageHandler
    {
        public HttpMethod? Method { get; private set; }
        public Uri? RequestUri { get; private set; }
        public string? AuthorizationScheme { get; private set; }
        public string? AuthorizationParameter { get; private set; }
        public string? IdempotencyKey { get; private set; }
        public string Body { get; private set; } = string.Empty;

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            Method = request.Method;
            RequestUri = request.RequestUri;
            AuthorizationScheme = request.Headers.Authorization?.Scheme;
            AuthorizationParameter = request.Headers.Authorization?.Parameter;
            IdempotencyKey = request.Headers.GetValues("Idempotency-Key").Single();
            Body = await request.Content!.ReadAsStringAsync(cancellationToken);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
