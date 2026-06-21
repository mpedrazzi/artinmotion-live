using ArtInMotion.Domain.Common;
using ArtInMotion.Domain.Enums;

namespace ArtInMotion.Domain.Entities;

public sealed class StreamSession : BaseEntity
{
    public Guid SessionId { get; private set; }
    public Session Session { get; private set; } = null!;
    public StreamStatus Status { get; private set; }
    public string? WebRtcOfferId { get; private set; }
    public DateTime? StartedAt { get; private set; }
    public DateTime? EndedAt { get; private set; }

    private StreamSession() { }

    public static StreamSession Create(Guid sessionId)
    {
        return new StreamSession
        {
            SessionId = sessionId,
            Status = StreamStatus.Idle
        };
    }

    public void Start(string? webRtcOfferId = null)
    {
        Status = StreamStatus.Active;
        WebRtcOfferId = webRtcOfferId;
        StartedAt = DateTime.UtcNow;
        SetUpdatedAt();
    }

    public void End()
    {
        Status = StreamStatus.Ended;
        EndedAt = DateTime.UtcNow;
        SetUpdatedAt();
    }
}
