using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using MediatR;

namespace ArtInMotion.Application.Performers.Commands.CreatePerformer;

public sealed class CreatePerformerCommandHandler(IPerformerRepository performerRepository)
    : IRequestHandler<CreatePerformerCommand, Guid>
{
    public async Task<Guid> Handle(CreatePerformerCommand request, CancellationToken cancellationToken)
    {
        var performer = Performer.Create(request.Name, request.AvatarUrl, request.Bio);
        await performerRepository.AddAsync(performer, cancellationToken);
        return performer.Id;
    }
}
