using MediatR;

namespace ArtInMotion.Application.Streams.Commands.StartStream;

public sealed record StartStreamCommand(Guid SessionId, string? WebRtcOfferId = null) : IRequest<Guid>;
