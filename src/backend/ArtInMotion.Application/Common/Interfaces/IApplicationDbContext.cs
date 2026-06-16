using ArtInMotion.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ArtInMotion.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Session> Sessions { get; }
    DbSet<Performer> Performers { get; }
    DbSet<StreamSession> StreamSessions { get; }
    DbSet<PoseFrame> PoseFrames { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
