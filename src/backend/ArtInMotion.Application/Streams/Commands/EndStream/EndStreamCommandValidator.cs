using FluentValidation;

namespace ArtInMotion.Application.Streams.Commands.EndStream;

public sealed class EndStreamCommandValidator : AbstractValidator<EndStreamCommand>
{
    public EndStreamCommandValidator()
    {
        RuleFor(x => x.StreamSessionId).NotEmpty();
    }
}
