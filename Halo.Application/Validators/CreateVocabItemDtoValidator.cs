using FluentValidation;
using Halo.Application.Dtos.VocabItem;

namespace Halo.Application.Validators
{
    public class CreateVocabItemDtoValidator : AbstractValidator<CreateVocabItemDto>
    {
        public CreateVocabItemDtoValidator()
        {
            RuleFor(x => x.Word).NotEmpty();
            RuleFor(x => x.NativeMeaning).NotEmpty();
            RuleFor(x => x.ForeignMeaning).NotEmpty();
            RuleFor(x => x.StudyDayId).GreaterThan(0);
        }
    }
}
