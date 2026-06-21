using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Streams.Queries.GetStream;

public sealed class GetStreamQueryHandler(IStreamSessionRepository streamSessionRepository)
    : IRequestHandler<GetStreamQuery, StreamSessionDto?>
{
    public async Task<StreamSessionDto?> Handle(GetStreamQuery request, CancellationToken cancellationToken)
    {
        var stream = await streamSessionRepository.GetByIdAsync(request.StreamSessionId, cancellationToken);
        if (stream is null) return null;
        return new StreamSessionDto(
            stream.Id,
            stream.SessionId,
            stream.Status,
            stream.WebRtcOfferId,
            stream.CreatedAt,
            stream.StartedAt,
            stream.EndedAt);
    }
}
