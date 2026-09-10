namespace ProjectsApi.Features.Projects;

public sealed record ProjectImageResponse(
    string Id,
    string ImageUrl,
    string AltText,
    int DisplayOrder,
    bool IsCover);

public sealed record ProjectResponse(
    string Id,
    string Title,
    string Slug,
    string Description,
    string Location,
    int Year,
    bool IsFeatured,
    DateTime CreatedAt,
    IReadOnlyList<ProjectImageResponse> Images);

public sealed record ProjectsPageResponse(
    IReadOnlyList<ProjectResponse> Items,
    int Page,
    int PageSize,
    long TotalItems,
    int TotalPages);

public sealed record ProjectsQuery(
    int Page = 1,
    int PageSize = 10,
    int? Year = null,
    bool? Featured = null,
    string? Location = null);
