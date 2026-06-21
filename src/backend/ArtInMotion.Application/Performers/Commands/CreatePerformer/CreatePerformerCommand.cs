using MediatR;

namespace ArtInMotion.Application.Performers.Commands.CreatePerformer;

public sealed record CreatePerformerCommand(string Name, string? AvatarUrl, string? Bio) : IRequest<Guid>;
