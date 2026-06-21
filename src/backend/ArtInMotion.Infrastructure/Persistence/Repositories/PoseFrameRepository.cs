using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ArtInMotion.Infrastructure.Persistence.Repositories;

public sealed class PoseFrameRepository(ApplicationDbContext context) : IPoseFrameRepository
{
    public async Task AddAsync(PoseFrame frame, CancellationToken cancellationToken = default)
    {
        await context.PoseFrames.AddAsync(frame, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<PoseFrame>> GetByStreamSessionIdAsync(Guid streamSessionId, CancellationToken cancellationToken = default)
        => await context.PoseFrames
            .Where(pf => pf.StreamSessionId == streamSessionId)
            .OrderBy(pf => pf.TimestampMs)
            .ToListAsync(cancellationToken);
}
