using ArtInMotion.Application.Common.Interfaces;
using ArtInMotion.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ArtInMotion.Infrastructure.Persistence;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options), IApplicationDbContext
{
    public DbSet<Session> Sessions => Set<Session>();
    public DbSet<Performer> Performers => Set<Performer>();
    public DbSet<StreamSession> StreamSessions => Set<StreamSession>();
    public DbSet<PoseFrame> PoseFrames => Set<PoseFrame>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
