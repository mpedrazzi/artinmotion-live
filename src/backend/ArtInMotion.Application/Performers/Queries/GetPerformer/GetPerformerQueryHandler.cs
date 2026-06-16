using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Performers.Queries.GetPerformer;

public sealed class GetPerformerQueryHandler(IPerformerRepository performerRepository)
    : IRequestHandler<GetPerformerQuery, PerformerDto?>
{
    public async Task<PerformerDto?> Handle(GetPerformerQuery request, CancellationToken cancellationToken)
    {
        var performer = await performerRepository.GetByIdAsync(request.PerformerId, cancellationToken);
        if (performer is null) return null;
        return new PerformerDto(performer.Id, performer.Name, performer.AvatarUrl, performer.Bio, performer.CreatedAt);
    }
}
