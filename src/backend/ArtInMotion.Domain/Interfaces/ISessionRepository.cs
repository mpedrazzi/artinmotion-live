using ArtInMotion.Domain.Entities;

namespace ArtInMotion.Domain.Interfaces;

public interface ISessionRepository
{
    Task<Session?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Session>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Session>> GetByPerformerIdAsync(Guid performerId, CancellationToken cancellationToken = default);
    Task AddAsync(Session session, CancellationToken cancellationToken = default);
    Task UpdateAsync(Session session, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
