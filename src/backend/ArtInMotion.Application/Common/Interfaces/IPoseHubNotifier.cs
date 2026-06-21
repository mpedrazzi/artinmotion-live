using ArtInMotion.Domain.Entities;

namespace ArtInMotion.Application.Common.Interfaces;

public interface IPoseHubNotifier
{
    Task BroadcastPoseFrameAsync(Guid streamSessionId, PoseFrame frame, CancellationToken cancellationToken = default);
    Task NotifyStreamStartedAsync(Guid streamSessionId, CancellationToken cancellationToken = default);
    Task NotifyStreamEndedAsync(Guid streamSessionId, CancellationToken cancellationToken = default);
}
