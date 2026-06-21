using ArtInMotion.Domain.Entities;

namespace ArtInMotion.Domain.Interfaces;

public interface IPerformerRepository
{
    Task<Performer?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Performer>> GetAllAsync(CancellationToken cancellationToken = default);
    Task AddAsync(Performer performer, CancellationToken cancellationToken = default);
    Task UpdateAsync(Performer performer, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
