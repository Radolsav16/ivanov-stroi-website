using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectsApi.Features.Contacts;

namespace ProjectsApi.Tests.Contacts;

public sealed class ContactControllerTests
{
    [Fact]
    public async Task Invalid_request_returns_frontend_compatible_bad_request()
    {
        var controller = CreateController();

        var result = await controller.Create(new ContactRequest(), CancellationToken.None);

        var badRequest = Assert.IsType<BadRequestObjectResult>(result);
        var payload = System.Text.Json.JsonSerializer.Serialize(badRequest.Value);
        Assert.Contains("message", payload);
        Assert.Contains("fields", payload);
        Assert.Contains("name", payload);
    }

    [Fact]
    public async Task Valid_request_returns_created()
    {
        var controller = CreateController();

        var result = await controller.Create(new ContactRequest
        {
            Name = "Иван Иванов",
            Phone = "+359 888 123 456",
            Email = "ivan@example.com",
            Service = "Ремонт на баня",
            Message = "Искам оглед и оферта за цялостен ремонт на баня."
        }, CancellationToken.None);

        var created = Assert.IsType<ObjectResult>(result);
        Assert.Equal(StatusCodes.Status201Created, created.StatusCode);
    }

    private static ContactController CreateController()
    {
        var service = new ContactService(new ContactRequestValidator(), new FakeContactRepository());
        return new ContactController(service)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
                {
                    Request = { ContentType = "application/json" }
                }
            }
        };
    }

    private sealed class FakeContactRepository : IContactRepository
    {
        public Task CreateAsync(ContactDocument contact, CancellationToken cancellationToken) =>
            Task.CompletedTask;
    }
}
