using ArtInMotion.Application.Sessions.Queries.GetSession;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Sessions.Queries.ListSessions;

public sealed class ListSessionsQueryHandler(ISessionRepository sessionRepository)
    : IRequestHandler<ListSessionsQuery, IReadOnlyList<SessionDto>>
{
    public async Task<IReadOnlyList<SessionDto>> Handle(ListSessionsQuery request, CancellationToken cancellationToken)
    {
        var sessions = request.PerformerId.HasValue
            ? await sessionRepository.GetByPerformerIdAsync(request.PerformerId.Value, cancellationToken)
            : await sessionRepository.GetAllAsync(cancellationToken);

        return sessions.Select(s => new SessionDto(
            s.Id,
            s.Title,
            s.Description,
            s.Status,
            s.PerformerId,
            s.Performer?.Name ?? string.Empty,
            s.CreatedAt,
            s.StartedAt,
            s.EndedAt)).ToList();
    }
}
