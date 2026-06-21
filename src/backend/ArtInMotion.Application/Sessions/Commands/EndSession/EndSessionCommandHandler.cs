using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Sessions.Commands.EndSession;

public sealed class EndSessionCommandHandler(ISessionRepository sessionRepository)
    : IRequestHandler<EndSessionCommand>
{
    public async Task Handle(EndSessionCommand request, CancellationToken cancellationToken)
    {
        var session = await sessionRepository.GetByIdAsync(request.SessionId, cancellationToken)
            ?? throw new InvalidOperationException($"Session {request.SessionId} not found.");
        session.End();
        await sessionRepository.UpdateAsync(session, cancellationToken);
    }
}
