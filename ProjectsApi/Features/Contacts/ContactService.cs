namespace ProjectsApi.Features.Contacts;

public sealed class ContactService(ContactRequestValidator validator, IContactRepository repository)
{
    public async Task<Dictionary<string, string[]>> SubmitAsync(
        ContactRequest request,
        CancellationToken cancellationToken)
    {
        var errors = validator.Validate(request);
        if (errors.Count > 0 || !string.IsNullOrWhiteSpace(request.Website)) return errors;

        await repository.CreateAsync(new ContactDocument
        {
            Name = request.Name.Trim(),
            Phone = ContactRequestValidator.NormalizePhone(request.Phone),
            Email = request.Email.Trim().ToLowerInvariant(),
            Service = request.Service.Trim(),
            Message = request.Message.Trim()
        }, cancellationToken);
        return errors;
    }
}
