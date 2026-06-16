using ArtInMotion.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtInMotion.Infrastructure.Persistence.Configurations;

public sealed class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> builder)
    {
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Title).IsRequired().HasMaxLength(200);
        builder.Property(s => s.Description).HasMaxLength(1000);
        builder.Property(s => s.Status).IsRequired();

        builder.HasOne(s => s.Performer)
            .WithMany()
            .HasForeignKey(s => s.PerformerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(s => s.Streams)
            .WithOne(st => st.Session)
            .HasForeignKey(st => st.SessionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
