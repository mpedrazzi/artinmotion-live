using MediatR;

namespace ArtInMotion.Application.Sessions.Commands.CreateSession;

public sealed record CreateSessionCommand(string Title, Guid PerformerId, string? Description) : IRequest<Guid>;
