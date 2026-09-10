using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using MongoDB.Driver;
using ProjectsApi.Common;
using ProjectsApi.Features.Contacts;
using ProjectsApi.Features.Projects;
using ProjectsApi.Infrastructure.MongoDb;

var builder = WebApplication.CreateBuilder(args);
var apiOptions = ApiOptions.FromConfiguration(builder.Configuration, builder.Environment.IsDevelopment());
var mongoOptions = MongoDbOptions.FromConfiguration(builder.Configuration);
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
builder.WebHost.ConfigureKestrel(options =>
{
    options.AddServerHeader = false;
    options.Limits.MaxRequestBodySize = 16 * 1024;
});

builder.Services.AddSingleton(apiOptions);
builder.Services.AddSingleton(mongoOptions);
builder.Services.AddSingleton<IMongoClient>(_ =>
{
    var settings = MongoClientSettings.FromConnectionString(mongoOptions.ConnectionString);
    settings.ServerSelectionTimeout = TimeSpan.FromSeconds(5);
    settings.ConnectTimeout = TimeSpan.FromSeconds(5);
    return new MongoClient(settings);
});
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddSingleton<MongoDbReadinessService>();
builder.Services.AddHostedService<MongoDbIndexesHostedService>();

builder.Services.AddScoped<ContactRequestValidator>();
builder.Services.AddScoped<IContactRepository, MongoContactRepository>();
builder.Services.AddScoped<ContactService>();
builder.Services.AddScoped<IProjectsRepository, MongoProjectsRepository>();
builder.Services.AddScoped<ProjectsService>();

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy => policy
        .WithOrigins(apiOptions.AllowedOrigins)
        .WithMethods("GET", "POST", "OPTIONS")
        .WithHeaders("Content-Type", "Accept"));
});
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = async (context, cancellationToken) =>
        await context.HttpContext.Response.WriteAsJsonAsync(
            new { message = "Твърде много опити. Моля, опитайте отново след малко." },
            cancellationToken);
    options.AddPolicy("contact", context => RateLimitPartition.GetFixedWindowLimiter(
        context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 3,
            Window = TimeSpan.FromMinutes(15),
            QueueLimit = 0,
            AutoReplenishment = true
        }));
});

var app = builder.Build();

app.UseForwardedHeaders();
app.UseExceptionHandler();
app.UseMiddleware<SecurityHeadersMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.UseRateLimiter();
app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapGet("/ready", async (MongoDbReadinessService readiness, CancellationToken cancellationToken) =>
    await readiness.IsReadyAsync(cancellationToken)
        ? Results.Ok(new { status = "ready", database = "connected" })
        : Results.Json(
            new { status = "unavailable", database = "disconnected" },
            statusCode: StatusCodes.Status503ServiceUnavailable));

app.Run();

public partial class Program;
