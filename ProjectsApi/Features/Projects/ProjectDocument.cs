using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectsApi.Features.Projects;

public sealed class ProjectDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; init; } = ObjectId.GenerateNewId().ToString();
    [BsonElement("title")]
    public string Title { get; init; } = string.Empty;
    [BsonElement("slug")]
    public string Slug { get; init; } = string.Empty;
    [BsonElement("description")]
    public string Description { get; init; } = string.Empty;
    [BsonElement("location")]
    public string Location { get; init; } = string.Empty;
    [BsonElement("year")]
    public int Year { get; init; }
    [BsonElement("isFeatured")]
    public bool IsFeatured { get; init; }
    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; init; }
    [BsonElement("images")]
    public List<ProjectImageDocument> Images { get; init; } = [];
}

public sealed class ProjectImageDocument
{
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("id")]
    public string Id { get; init; } = ObjectId.GenerateNewId().ToString();
    [BsonElement("imageUrl")]
    public string ImageUrl { get; init; } = string.Empty;
    [BsonElement("altText")]
    public string AltText { get; init; } = string.Empty;
    [BsonElement("displayOrder")]
    public int DisplayOrder { get; init; }
    [BsonElement("isCover")]
    public bool IsCover { get; init; }
}
