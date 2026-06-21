using FluentValidation;

namespace ArtInMotion.Application.Streams.Commands.StartStream;

public sealed class StartStreamCommandValidator : AbstractValidator<StartStreamCommand>
{
    public StartStreamCommandValidator()
    {
        RuleFor(x => x.SessionId).NotEmpty();
    }
}
