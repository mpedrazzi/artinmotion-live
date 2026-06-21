using FluentValidation;

namespace ArtInMotion.Application.Streams.Commands.PublishPoseFrame;

public sealed class PublishPoseFrameCommandValidator : AbstractValidator<PublishPoseFrameCommand>
{
    public PublishPoseFrameCommandValidator()
    {
        RuleFor(x => x.StreamSessionId).NotEmpty();
        RuleFor(x => x.TimestampMs).GreaterThanOrEqualTo(0);
        RuleFor(x => x.Keypoints).NotNull();
    }
}
