using ArtInMotion.Domain.Entities;

namespace ArtInMotion.Domain.Interfaces;

public interface IPoseFrameRepository
{
    Task AddAsync(PoseFrame frame, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<PoseFrame>> GetByStreamSessionIdAsync(Guid streamSessionId, CancellationToken cancellationToken = default);
}
