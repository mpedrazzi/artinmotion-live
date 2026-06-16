using ArtInMotion.Application.Sessions.Queries.GetSession;
using MediatR;

namespace ArtInMotion.Application.Sessions.Queries.ListSessions;

public sealed record ListSessionsQuery(Guid? PerformerId = null) : IRequest<IReadOnlyList<SessionDto>>;
