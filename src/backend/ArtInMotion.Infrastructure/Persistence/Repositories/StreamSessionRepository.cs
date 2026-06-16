using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Enums;
using ArtInMotion.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ArtInMotion.Infrastructure.Persistence.Repositories;

public sealed class StreamSessionRepository(ApplicationDbContext context) : IStreamSessionRepository
{
    public async Task<StreamSession?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await context.StreamSessions.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

    public async Task<StreamSession?> GetActiveBySessionIdAsync(Guid sessionId, CancellationToken cancellationToken = default)
        => await context.StreamSessions
            .Where(s => s.SessionId == sessionId && s.Status == StreamStatus.Active)
            .FirstOrDefaultAsync(cancellationToken);

    public async Task AddAsync(StreamSession stream, CancellationToken cancellationToken = default)
    {
        await context.StreamSessions.AddAsync(stream, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(StreamSession stream, CancellationToken cancellationToken = default)
    {
        context.StreamSessions.Update(stream);
        await context.SaveChangesAsync(cancellationToken);
    }
}
