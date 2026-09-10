namespace ProjectsApi.Common;

public sealed class ApiOptions
{
    public required string[] AllowedOrigins { get; init; }

    public static ApiOptions FromConfiguration(IConfiguration configuration, bool isDevelopment)
    {
        var configuredOrigins = configuration["ALLOWED_ORIGINS"];
        if (string.IsNullOrWhiteSpace(configuredOrigins) && !isDevelopment)
            throw new InvalidOperationException("ALLOWED_ORIGINS is required in production.");

        var configured = (configuredOrigins ?? "http://localhost:5173")
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToArray();

        if (configured.Length == 0)
            throw new InvalidOperationException("ALLOWED_ORIGINS must contain at least one origin.");

        var origins = new List<string>(configured.Length);
        foreach (var origin in configured)
        {
            if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri) ||
                (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps) ||
                (!isDevelopment && uri.Scheme != Uri.UriSchemeHttps) ||
                uri.AbsolutePath != "/" || !string.IsNullOrEmpty(uri.Query) ||
                !string.IsNullOrEmpty(uri.Fragment) || !string.IsNullOrEmpty(uri.UserInfo))
            {
                throw new InvalidOperationException("ALLOWED_ORIGINS must contain valid HTTP(S) origins without paths.");
            }

            origins.Add(uri.GetLeftPart(UriPartial.Authority));
        }

        return new ApiOptions
        {
            AllowedOrigins = origins.Distinct(StringComparer.OrdinalIgnoreCase).ToArray()
        };
    }
}
