using ArtInMotion.Domain.Entities;

namespace ArtInMotion.Domain.Events;

public sealed record PoseFrameReceivedEvent(Guid StreamSessionId, PoseFrame Frame);
