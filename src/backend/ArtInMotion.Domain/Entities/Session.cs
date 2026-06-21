using ArtInMotion.Domain.Common;
using ArtInMotion.Domain.Enums;

namespace ArtInMotion.Domain.Entities;

public sealed class Session : BaseEntity
{
    public string Title { get; private set; }
    public string? Description { get; private set; }
    public SessionStatus Status { get; private set; }
    public Guid PerformerId { get; private set; }
    public Performer Performer { get; private set; } = null!;
    public DateTime? StartedAt { get; private set; }
    public DateTime? EndedAt { get; private set; }
    private readonly List<StreamSession> _streams = new();
    public IReadOnlyCollection<StreamSession> Streams => _streams.AsReadOnly();

    private Session() { Title = string.Empty; }

    public static Session Create(string title, Guid performerId, string? description = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        return new Session
        {
            Title = title,
            PerformerId = performerId,
            Description = description,
            Status = SessionStatus.Scheduled
        };
    }

    public void Start()
    {
        Status = SessionStatus.Live;
        StartedAt = DateTime.UtcNow;
        SetUpdatedAt();
    }

    public void End()
    {
        Status = SessionStatus.Ended;
        EndedAt = DateTime.UtcNow;
        SetUpdatedAt();
    }
}
