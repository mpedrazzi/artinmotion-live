using ArtInMotion.Domain.Common;

namespace ArtInMotion.Domain.Entities;

public sealed class PoseFrame : BaseEntity
{
    public Guid StreamSessionId { get; private set; }
    public StreamSession StreamSession { get; private set; } = null!;
    public long TimestampMs { get; private set; }
    public IReadOnlyList<Keypoint> Keypoints { get; private set; } = [];

    private PoseFrame() { }

    public static PoseFrame Create(Guid streamSessionId, long timestampMs, IReadOnlyList<Keypoint> keypoints)
    {
        return new PoseFrame
        {
            StreamSessionId = streamSessionId,
            TimestampMs = timestampMs,
            Keypoints = keypoints
        };
    }
}

public sealed record Keypoint(string Name, float X, float Y, float Z, float Confidence);
