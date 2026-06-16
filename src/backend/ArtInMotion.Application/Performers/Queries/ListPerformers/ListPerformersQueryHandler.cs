using ArtInMotion.Application.Performers.Queries.GetPerformer;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Performers.Queries.ListPerformers;

public sealed class ListPerformersQueryHandler(IPerformerRepository performerRepository)
    : IRequestHandler<ListPerformersQuery, IReadOnlyList<PerformerDto>>
{
    public async Task<IReadOnlyList<PerformerDto>> Handle(ListPerformersQuery request, CancellationToken cancellationToken)
    {
        var performers = await performerRepository.GetAllAsync(cancellationToken);
        return performers.Select(p => new PerformerDto(p.Id, p.Name, p.AvatarUrl, p.Bio, p.CreatedAt)).ToList();
    }
}
