using FluentValidation;
using Halo.Application.Dtos.GrammarItem;

namespace Halo.Application.Validators
{
    public class CreateGrammarItemDtoValidator : AbstractValidator<CreateGrammarItemDto>
    {
        public CreateGrammarItemDtoValidator()
        {
            RuleFor(x => x.Topic).NotEmpty();
            RuleFor(x => x.Explanation).NotEmpty();
            RuleFor(x => x.StudyDayId).GreaterThan(0);
        }
    }
}
