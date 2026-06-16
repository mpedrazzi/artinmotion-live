using MediatR;

namespace ArtInMotion.Application.Streams.Queries.GetStream;

public sealed record GetStreamQuery(Guid StreamSessionId) : IRequest<StreamSessionDto?>;
