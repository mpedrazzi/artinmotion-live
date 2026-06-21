using ArtInMotion.Application.Common.Interfaces;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Streams.Commands.EndStream;

public sealed class EndStreamCommandHandler(
    IStreamSessionRepository streamSessionRepository,
    IPoseHubNotifier poseHubNotifier)
    : IRequestHandler<EndStreamCommand>
{
    public async Task Handle(EndStreamCommand request, CancellationToken cancellationToken)
    {
        var stream = await streamSessionRepository.GetByIdAsync(request.StreamSessionId, cancellationToken)
            ?? throw new InvalidOperationException($"Stream {request.StreamSessionId} not found.");
        stream.End();
        await streamSessionRepository.UpdateAsync(stream, cancellationToken);
        await poseHubNotifier.NotifyStreamEndedAsync(stream.Id, cancellationToken);
    }
}
