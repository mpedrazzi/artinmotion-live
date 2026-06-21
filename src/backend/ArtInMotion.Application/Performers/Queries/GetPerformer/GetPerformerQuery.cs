using MediatR;

namespace ArtInMotion.Application.Performers.Queries.GetPerformer;

public sealed record GetPerformerQuery(Guid PerformerId) : IRequest<PerformerDto?>;
