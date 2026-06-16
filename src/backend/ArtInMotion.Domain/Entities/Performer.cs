using ArtInMotion.Domain.Common;

namespace ArtInMotion.Domain.Entities;

public sealed class Performer : BaseEntity
{
    public string Name { get; private set; }
    public string? AvatarUrl { get; private set; }
    public string? Bio { get; private set; }

    private Performer() { Name = string.Empty; }

    public static Performer Create(string name, string? avatarUrl = null, string? bio = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        return new Performer { Name = name, AvatarUrl = avatarUrl, Bio = bio };
    }

    public void Update(string name, string? avatarUrl, string? bio)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name;
        AvatarUrl = avatarUrl;
        Bio = bio;
        SetUpdatedAt();
    }
}
