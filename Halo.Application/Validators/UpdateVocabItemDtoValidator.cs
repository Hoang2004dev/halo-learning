using FluentValidation;
using Halo.Application.Dtos.VocabItem;

namespace Halo.Application.Validators
{
    public class UpdateVocabItemDtoValidator : AbstractValidator<UpdateVocabItemDto>
    {
        public UpdateVocabItemDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Word).NotEmpty();
            RuleFor(x => x.NativeMeaning).NotEmpty();
            RuleFor(x => x.ForeignMeaning).NotEmpty();
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}
