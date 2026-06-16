using ArtInMotion.Application.Sessions.Queries.GetSession;
using MediatR;

namespace ArtInMotion.Application.Sessions.Queries.GetSession;

public sealed record GetSessionQuery(Guid SessionId) : IRequest<SessionDto?>;
