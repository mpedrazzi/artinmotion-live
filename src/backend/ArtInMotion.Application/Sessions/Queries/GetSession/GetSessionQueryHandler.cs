using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Sessions.Queries.GetSession;

public sealed class GetSessionQueryHandler(ISessionRepository sessionRepository)
    : IRequestHandler<GetSessionQuery, SessionDto?>
{
    public async Task<SessionDto?> Handle(GetSessionQuery request, CancellationToken cancellationToken)
    {
        var session = await sessionRepository.GetByIdAsync(request.SessionId, cancellationToken);
        if (session is null) return null;
        return new SessionDto(
            session.Id,
            session.Title,
            session.Description,
            session.Status,
            session.PerformerId,
            session.Performer?.Name ?? string.Empty,
            session.CreatedAt,
            session.StartedAt,
            session.EndedAt);
    }
}
