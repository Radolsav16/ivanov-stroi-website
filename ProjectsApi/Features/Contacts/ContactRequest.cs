namespace ProjectsApi.Features.Contacts;

public sealed class ContactRequest
{
    public string Name { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Service { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
    public string Website { get; init; } = string.Empty;
}
