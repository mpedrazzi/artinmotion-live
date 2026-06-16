using ArtInMotion.Domain.Enums;

namespace ArtInMotion.Application.Streams.Queries.GetStream;

public sealed record StreamSessionDto(
    Guid Id,
    Guid SessionId,
    StreamStatus Status,
    string? WebRtcOfferId,
    DateTime CreatedAt,
    DateTime? StartedAt,
    DateTime? EndedAt);
