using FluentValidation;

namespace ArtInMotion.Application.Sessions.Commands.EndSession;

public sealed class EndSessionCommandValidator : AbstractValidator<EndSessionCommand>
{
    public EndSessionCommandValidator()
    {
        RuleFor(x => x.SessionId).NotEmpty();
    }
}
