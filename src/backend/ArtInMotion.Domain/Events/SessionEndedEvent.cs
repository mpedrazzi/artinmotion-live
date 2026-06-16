namespace ArtInMotion.Domain.Events;

public sealed record SessionEndedEvent(Guid SessionId, DateTime EndedAt);
