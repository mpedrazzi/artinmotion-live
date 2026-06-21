using ArtInMotion.Domain.Entities;
using ArtInMotion.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ArtInMotion.Infrastructure.Persistence.Repositories;

public sealed class PerformerRepository(ApplicationDbContext context) : IPerformerRepository
{
    public async Task<Performer?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await context.Performers.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

    public async Task<IReadOnlyList<Performer>> GetAllAsync(CancellationToken cancellationToken = default)
        => await context.Performers.OrderBy(p => p.Name).ToListAsync(cancellationToken);

    public async Task AddAsync(Performer performer, CancellationToken cancellationToken = default)
    {
        await context.Performers.AddAsync(performer, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Performer performer, CancellationToken cancellationToken = default)
    {
        context.Performers.Update(performer);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var performer = await GetByIdAsync(id, cancellationToken);
        if (performer is not null)
        {
            context.Performers.Remove(performer);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
