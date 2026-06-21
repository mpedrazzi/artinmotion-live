using FluentValidation;

namespace ArtInMotion.Application.Performers.Commands.CreatePerformer;

public sealed class CreatePerformerCommandValidator : AbstractValidator<CreatePerformerCommand>
{
    public CreatePerformerCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.AvatarUrl).MaximumLength(500).When(x => x.AvatarUrl is not null);
        RuleFor(x => x.Bio).MaximumLength(2000).When(x => x.Bio is not null);
    }
}
