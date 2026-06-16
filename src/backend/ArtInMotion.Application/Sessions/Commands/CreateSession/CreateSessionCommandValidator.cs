using FluentValidation;

namespace ArtInMotion.Application.Sessions.Commands.CreateSession;

public sealed class CreateSessionCommandValidator : AbstractValidator<CreateSessionCommand>
{
    public CreateSessionCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.PerformerId).NotEmpty();
        RuleFor(x => x.Description).MaximumLength(1000).When(x => x.Description is not null);
    }
}
