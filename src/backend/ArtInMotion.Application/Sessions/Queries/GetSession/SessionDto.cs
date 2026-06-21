using ArtInMotion.Domain.Enums;

namespace ArtInMotion.Application.Sessions.Queries.GetSession;

public sealed record SessionDto(
    Guid Id,
    string Title,
    string? Description,
    SessionStatus Status,
    Guid PerformerId,
    string PerformerName,
    DateTime CreatedAt,
    DateTime? StartedAt,
    DateTime? EndedAt);
