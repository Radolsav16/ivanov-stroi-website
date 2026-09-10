using Microsoft.AspNetCore.Diagnostics;

namespace ProjectsApi.Common;

public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext context,
        Exception exception,
        CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled API error for {Method} {Path}", context.Request.Method, context.Request.Path);
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(
            new { message = "Възникна проблем. Моля, опитайте отново." }, cancellationToken);
        return true;
    }
}
