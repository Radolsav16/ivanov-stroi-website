namespace ProjectsApi.Common;

public sealed class SecurityHeadersMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.Headers.XContentTypeOptions = "nosniff";
        context.Response.Headers.XFrameOptions = "DENY";
        context.Response.Headers.ReferrerPolicy = "no-referrer";
        context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
        await next(context);
    }
}
