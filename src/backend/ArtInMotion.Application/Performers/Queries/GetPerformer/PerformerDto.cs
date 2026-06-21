namespace ArtInMotion.Application.Performers.Queries.GetPerformer;

public sealed record PerformerDto(Guid Id, string Name, string? AvatarUrl, string? Bio, DateTime CreatedAt);
