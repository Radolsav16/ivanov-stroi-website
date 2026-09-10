using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectsApi.Features.Contacts;

public sealed class ContactDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; init; } = ObjectId.GenerateNewId().ToString();
    [BsonElement("name")]
    public required string Name { get; init; }
    [BsonElement("phone")]
    public required string Phone { get; init; }
    [BsonElement("email")]
    public required string Email { get; init; }
    [BsonElement("service")]
    public required string Service { get; init; }
    [BsonElement("message")]
    public required string Message { get; init; }
    [BsonElement("status")]
    public string Status { get; init; } = "new";
    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}
