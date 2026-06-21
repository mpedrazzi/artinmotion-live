using ArtInMotion.Application.Common.Interfaces;
using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Streams.Commands.PublishPoseFrame;

public sealed class PublishPoseFrameCommandHandler(
    IStreamSessionRepository streamSessionRepository,
    IPoseFrameRepository poseFrameRepository,
    IPoseHubNotifier poseHubNotifier)
    : IRequestHandler<PublishPoseFrameCommand>
{
    public async Task Handle(PublishPoseFrameCommand request, CancellationToken cancellationToken)
    {
        var stream = await streamSessionRepository.GetByIdAsync(request.StreamSessionId, cancellationToken)
            ?? throw new InvalidOperationException($"Stream {request.StreamSessionId} not found.");

        var keypoints = request.Keypoints
            .Select(k => new Keypoint(k.Name, k.X, k.Y, k.Z, k.Confidence))
            .ToList();

        var frame = PoseFrame.Create(stream.Id, request.TimestampMs, keypoints);
        await poseFrameRepository.AddAsync(frame, cancellationToken);
        await poseHubNotifier.BroadcastPoseFrameAsync(stream.Id, frame, cancellationToken);
    }
}
