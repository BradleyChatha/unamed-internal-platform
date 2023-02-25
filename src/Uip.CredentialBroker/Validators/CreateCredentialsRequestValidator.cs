using FluentValidation;

namespace Uip.CredentialBroker.Validators;

public class CreateCredentialsRequestValidator : AbstractValidator<CreateCredentialsRequest>
{
    public CreateCredentialsRequestValidator()
    {
        RuleFor(x => x.PluginId)
            .NotNull()
            .WithErrorCode("constraint_not_null")
            .WithMessage("Field must not be null.");
    }
}
