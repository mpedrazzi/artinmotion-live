using ArtInMotion.Application.Performers.Queries.GetPerformer;
using MediatR;

namespace ArtInMotion.Application.Performers.Queries.ListPerformers;

public sealed record ListPerformersQuery : IRequest<IReadOnlyList<PerformerDto>>;
