using ArtInMotion.Domain.Entities;

namespace ArtInMotion.Domain.Interfaces;

public interface IStreamSessionRepository
{
    Task<StreamSession?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<StreamSession?> GetActiveBySessionIdAsync(Guid sessionId, CancellationToken cancellationToken = default);
    Task AddAsync(StreamSession stream, CancellationToken cancellationToken = default);
    Task UpdateAsync(StreamSession stream, CancellationToken cancellationToken = default);
}
