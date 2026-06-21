using ArtInMotion.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtInMotion.Infrastructure.Persistence.Configurations;

public sealed class PerformerConfiguration : IEntityTypeConfiguration<Performer>
{
    public void Configure(EntityTypeBuilder<Performer> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Name).IsRequired().HasMaxLength(200);
        builder.Property(p => p.AvatarUrl).HasMaxLength(500);
        builder.Property(p => p.Bio).HasMaxLength(2000);
    }
}
