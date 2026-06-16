namespace ArtInMotion.Domain.Events;

public sealed record SessionStartedEvent(Guid SessionId, DateTime StartedAt);
