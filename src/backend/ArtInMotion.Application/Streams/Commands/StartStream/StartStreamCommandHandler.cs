using ArtInMotion.Application.Common.Interfaces;
using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Streams.Commands.StartStream;

public sealed class StartStreamCommandHandler(
    IStreamSessionRepository streamSessionRepository,
    ISessionRepository sessionRepository,
    IPoseHubNotifier poseHubNotifier)
    : IRequestHandler<StartStreamCommand, Guid>
{
    public async Task<Guid> Handle(StartStreamCommand request, CancellationToken cancellationToken)
    {
        var session = await sessionRepository.GetByIdAsync(request.SessionId, cancellationToken)
            ?? throw new InvalidOperationException($"Session {request.SessionId} not found.");

        session.Start();
        await sessionRepository.UpdateAsync(session, cancellationToken);

        var stream = StreamSession.Create(request.SessionId);
        stream.Start(request.WebRtcOfferId);
        await streamSessionRepository.AddAsync(stream, cancellationToken);

        await poseHubNotifier.NotifyStreamStartedAsync(stream.Id, cancellationToken);
        return stream.Id;
    }
}
