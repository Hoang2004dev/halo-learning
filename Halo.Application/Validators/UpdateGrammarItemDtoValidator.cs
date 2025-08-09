using FluentValidation;
using Halo.Application.Dtos.GrammarItem;

namespace Halo.Application.Validators
{
    public class UpdateGrammarItemDtoValidator : AbstractValidator<UpdateGrammarItemDto>
    {
        public UpdateGrammarItemDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Topic).NotEmpty();
            RuleFor(x => x.Explanation).NotEmpty();
        }
    }
}
