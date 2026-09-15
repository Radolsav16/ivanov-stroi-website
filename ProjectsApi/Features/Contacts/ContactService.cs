namespace ProjectsApi.Features.Contacts;

public sealed class ContactService(
    ContactRequestValidator validator,
    IContactRepository repository,
    IContactNotifier notifier,
    ILogger<ContactService> logger)
{
    public async Task<Dictionary<string, string[]>> SubmitAsync(
        ContactRequest request,
        CancellationToken cancellationToken)
    {
        var errors = validator.Validate(request);
        if (errors.Count > 0 || !string.IsNullOrWhiteSpace(request.Website)) return errors;

        var contact = new ContactDocument
        {
            Name = request.Name.Trim(),
            Phone = ContactRequestValidator.NormalizePhone(request.Phone),
            Email = request.Email.Trim().ToLowerInvariant(),
            Service = request.Service.Trim(),
            Message = request.Message.Trim()
        };

        await repository.CreateAsync(contact, cancellationToken);

        bool sent;
        try
        {
            sent = await notifier.SendAsync(contact, CancellationToken.None);
        }
        catch (Exception exception) when (exception is HttpRequestException or TaskCanceledException)
        {
            logger.LogError(exception, "Contact {ContactId} was saved but its email notification failed", contact.Id);
            await TryUpdateNotificationStatusAsync(
                () => repository.MarkNotificationFailedAsync(
                    contact.Id,
                    exception.GetType().Name,
                    CancellationToken.None),
                contact.Id);
            return errors;
        }

        await TryUpdateNotificationStatusAsync(
            () => sent
                ? repository.MarkNotificationSentAsync(contact.Id, CancellationToken.None)
                : repository.MarkNotificationSkippedAsync(contact.Id, CancellationToken.None),
            contact.Id);

        return errors;
    }

    private async Task TryUpdateNotificationStatusAsync(Func<Task> update, string contactId)
    {
        try
        {
            await update();
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Could not persist notification status for contact {ContactId}", contactId);
        }
    }
}
