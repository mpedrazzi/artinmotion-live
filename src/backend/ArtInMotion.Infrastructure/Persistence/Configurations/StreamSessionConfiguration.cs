using ArtInMotion.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtInMotion.Infrastructure.Persistence.Configurations;

public sealed class StreamSessionConfiguration : IEntityTypeConfiguration<StreamSession>
{
    public void Configure(EntityTypeBuilder<StreamSession> builder)
    {
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Status).IsRequired();
        builder.Property(s => s.WebRtcOfferId).HasMaxLength(500);

        builder.HasMany<PoseFrame>()
            .WithOne(pf => pf.StreamSession)
            .HasForeignKey(pf => pf.StreamSessionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
