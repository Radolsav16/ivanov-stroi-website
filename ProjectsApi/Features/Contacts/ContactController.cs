using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ProjectsApi.Features.Contacts;

[ApiController]
[Route("api/contact")]
public sealed class ContactController(ContactService service) : ControllerBase
{
    [HttpPost]
    [EnableRateLimiting("contact")]
    public async Task<IActionResult> Create(ContactRequest request, CancellationToken cancellationToken)
    {
        if (!Request.HasJsonContentType())
            return StatusCode(StatusCodes.Status415UnsupportedMediaType, new { message = "Очакват се JSON данни." });
        if (!string.IsNullOrWhiteSpace(request.Website))
            return BadRequest(new { message = "Невалидна заявка." });

        var errors = await service.SubmitAsync(request, cancellationToken);
        if (errors.Count > 0)
            return BadRequest(new { message = "Проверете въведените данни.", fields = errors });

        return StatusCode(StatusCodes.Status201Created, new { message = "Запитването е прието." });
    }
}
