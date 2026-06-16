using ArtInMotion.Application.Common.Interfaces;
using ArtInMotion.Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ArtInMotion.Infrastructure.SignalR;

public sealed class PoseHubNotifier(IHubContext<PoseHub> hubContext) : IPoseHubNotifier
{
    public async Task BroadcastPoseFrameAsync(Guid streamSessionId, PoseFrame frame, CancellationToken cancellationToken = default)
    {
        var payload = new
        {
            streamSessionId,
            frame.TimestampMs,
            keypoints = frame.Keypoints.Select(k => new
            {
                k.Name, k.X, k.Y, k.Z, k.Confidence
            })
        };
        await hubContext.Clients.Group(streamSessionId.ToString())
            .SendAsync("PoseFrameReceived", payload, cancellationToken);
    }

    public async Task NotifyStreamStartedAsync(Guid streamSessionId, CancellationToken cancellationToken = default)
        => await hubContext.Clients.All.SendAsync("StreamStarted", streamSessionId, cancellationToken);

    public async Task NotifyStreamEndedAsync(Guid streamSessionId, CancellationToken cancellationToken = default)
        => await hubContext.Clients.All.SendAsync("StreamEnded", streamSessionId, cancellationToken);
}
