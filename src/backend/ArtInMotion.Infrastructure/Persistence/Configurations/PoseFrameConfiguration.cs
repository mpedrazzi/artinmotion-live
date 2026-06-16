using ArtInMotion.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace ArtInMotion.Infrastructure.Persistence.Configurations;

public sealed class PoseFrameConfiguration : IEntityTypeConfiguration<PoseFrame>
{
    public void Configure(EntityTypeBuilder<PoseFrame> builder)
    {
        builder.HasKey(pf => pf.Id);
        builder.Property(pf => pf.TimestampMs).IsRequired();

        builder.Property(pf => pf.Keypoints)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => (JsonSerializer.Deserialize<List<Keypoint>>(v, (JsonSerializerOptions?)null) as IReadOnlyList<Keypoint>) ?? new List<Keypoint>())
            .HasColumnType("TEXT");
    }
}
