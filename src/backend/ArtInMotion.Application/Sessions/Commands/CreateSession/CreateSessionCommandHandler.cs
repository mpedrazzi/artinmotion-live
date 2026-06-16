using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Sessions.Commands.CreateSession;

public sealed class CreateSessionCommandHandler(ISessionRepository sessionRepository)
    : IRequestHandler<CreateSessionCommand, Guid>
{
    public async Task<Guid> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
    {
        var session = Session.Create(request.Title, request.PerformerId, request.Description);
        await sessionRepository.AddAsync(session, cancellationToken);
        return session.Id;
    }
}
