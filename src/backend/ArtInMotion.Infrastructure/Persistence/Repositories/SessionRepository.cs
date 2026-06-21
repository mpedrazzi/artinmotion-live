using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ArtInMotion.Infrastructure.Persistence.Repositories;

public sealed class SessionRepository(ApplicationDbContext context) : ISessionRepository
{
    public async Task<Session?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await context.Sessions
            .Include(s => s.Performer)
            .Include(s => s.Streams)
            .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);

    public async Task<IReadOnlyList<Session>> GetAllAsync(CancellationToken cancellationToken = default)
        => await context.Sessions
            .Include(s => s.Performer)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Session>> GetByPerformerIdAsync(Guid performerId, CancellationToken cancellationToken = default)
        => await context.Sessions
            .Include(s => s.Performer)
            .Where(s => s.PerformerId == performerId)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task AddAsync(Session session, CancellationToken cancellationToken = default)
    {
        await context.Sessions.AddAsync(session, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Session session, CancellationToken cancellationToken = default)
    {
        context.Sessions.Update(session);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var session = await GetByIdAsync(id, cancellationToken);
        if (session is not null)
        {
            context.Sessions.Remove(session);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
