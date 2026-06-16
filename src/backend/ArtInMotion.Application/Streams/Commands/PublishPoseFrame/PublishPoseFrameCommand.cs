using ArtInMotion.Application.Streams.Commands.PublishPoseFrame;
using MediatR;

namespace ArtInMotion.Application.Streams.Commands.PublishPoseFrame;

public sealed record KeypointDto(string Name, float X, float Y, float Z, float Confidence);

public sealed record PublishPoseFrameCommand(
    Guid StreamSessionId,
    long TimestampMs,
    IReadOnlyList<KeypointDto> Keypoints) : IRequest;
