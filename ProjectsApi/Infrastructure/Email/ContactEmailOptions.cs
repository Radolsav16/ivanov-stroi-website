using System.Net.Mail;

namespace ProjectsApi.Infrastructure.Email;

public sealed class ContactEmailOptions
{
    public bool Enabled { get; init; }
    public required string ApiKey { get; init; }
    public required string From { get; init; }
    public required string Recipient { get; init; }

    public static ContactEmailOptions FromConfiguration(IConfiguration configuration)
    {
        var enabled = bool.TryParse(configuration["CONTACT_EMAIL_ENABLED"], out var configuredEnabled) &&
                      configuredEnabled;
        var apiKey = configuration["RESEND_API_KEY"]?.Trim() ?? string.Empty;
        var from = configuration["CONTACT_EMAIL_FROM"]?.Trim() ?? string.Empty;
        var recipient = configuration["CONTACT_EMAIL_TO"]?.Trim() ?? string.Empty;

        if (enabled)
        {
            if (string.IsNullOrWhiteSpace(apiKey))
                throw new InvalidOperationException("RESEND_API_KEY is required when contact email is enabled.");
            if (!IsValidEmailAddress(from))
                throw new InvalidOperationException("CONTACT_EMAIL_FROM must be a valid sender address.");
            if (!IsValidEmailAddress(recipient))
                throw new InvalidOperationException("CONTACT_EMAIL_TO must be a valid recipient address.");
        }

        return new ContactEmailOptions
        {
            Enabled = enabled,
            ApiKey = apiKey,
            From = from,
            Recipient = recipient
        };
    }

    private static bool IsValidEmailAddress(string value)
    {
        if (string.IsNullOrWhiteSpace(value)) return false;
        try
        {
            _ = new MailAddress(value);
            return true;
        }
        catch (FormatException)
        {
            return false;
        }
    }
}
