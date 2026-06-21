using MediatR;

namespace ArtInMotion.Application.Streams.Commands.EndStream;

public sealed record EndStreamCommand(Guid StreamSessionId) : IRequest;
