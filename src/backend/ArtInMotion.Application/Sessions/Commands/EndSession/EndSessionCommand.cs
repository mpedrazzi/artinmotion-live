using MediatR;

namespace ArtInMotion.Application.Sessions.Commands.EndSession;

public sealed record EndSessionCommand(Guid SessionId) : IRequest;
