using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using ProjectsApi.Features.Contacts;

namespace ProjectsApi.Infrastructure.Email;

public sealed class ResendContactNotifier(
    HttpClient httpClient,
    ContactEmailOptions options,
    ILogger<ResendContactNotifier> logger) : IContactNotifier
{
    public async Task<bool> SendAsync(ContactDocument contact, CancellationToken cancellationToken)
    {
        if (!options.Enabled) return false;

        using var request = new HttpRequestMessage(HttpMethod.Post, "emails");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", options.ApiKey);
        request.Headers.Add("Idempotency-Key", $"contact-{contact.Id}");
        request.Content = JsonContent.Create(new
        {
            from = options.From,
            to = new[] { options.Recipient },
            reply_to = contact.Email,
            subject = $"Ново запитване: {SingleLine(contact.Service)} — {SingleLine(contact.Name)}",
            text = BuildText(contact)
        });

        using var response = await httpClient.SendAsync(request, cancellationToken);
        if (response.IsSuccessStatusCode) return true;

        logger.LogError(
            "Resend rejected notification for contact {ContactId} with status {StatusCode}",
            contact.Id,
            (int)response.StatusCode);
        throw new HttpRequestException(
            $"Email provider returned HTTP {(int)response.StatusCode}.",
            null,
            response.StatusCode);
    }

    private static string SingleLine(string value) => value.ReplaceLineEndings(" ").Trim();

    private static string BuildText(ContactDocument contact)
    {
        var text = new StringBuilder();
        text.AppendLine("Получено е ново запитване от сайта на IVANOV STROI.");
        text.AppendLine();
        text.AppendLine($"Име: {contact.Name}");
        text.AppendLine($"Телефон: {contact.Phone}");
        text.AppendLine($"Email: {contact.Email}");
        text.AppendLine($"Услуга: {contact.Service}");
        text.AppendLine();
        text.AppendLine("Съобщение:");
        text.AppendLine(contact.Message);
        text.AppendLine();
        text.AppendLine($"Получено на: {contact.CreatedAt:dd.MM.yyyy HH:mm} UTC");
        return text.ToString();
    }
}
