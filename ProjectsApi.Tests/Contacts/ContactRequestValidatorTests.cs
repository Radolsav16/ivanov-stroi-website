using ProjectsApi.Features.Contacts;

namespace ProjectsApi.Tests.Contacts;

public sealed class ContactRequestValidatorTests
{
    private readonly ContactRequestValidator _validator = new();

    [Fact]
    public void Valid_request_has_no_errors()
    {
        var errors = _validator.Validate(new ContactRequest
        {
            Name = "Иван Иванов",
            Phone = "+359 888 123 456",
            Email = "ivan@example.com",
            Service = "Ремонт на баня",
            Message = "Искам оглед и оферта за цялостен ремонт на баня."
        });

        Assert.Empty(errors);
    }

    [Fact]
    public void Invalid_request_returns_frontend_field_names()
    {
        var errors = _validator.Validate(new ContactRequest());

        Assert.Contains("name", errors.Keys);
        Assert.Contains("phone", errors.Keys);
        Assert.Contains("email", errors.Keys);
        Assert.Contains("service", errors.Keys);
        Assert.Contains("message", errors.Keys);
    }
}
