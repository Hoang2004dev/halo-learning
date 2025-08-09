using FluentValidation;
using Halo.Application.Dtos.WritingItem;

namespace Halo.Application.Validators
{
    public class CreateWritingItemDtoValidator : AbstractValidator<CreateWritingItemDto>
    {
        public CreateWritingItemDtoValidator()
        {
            RuleFor(x => x.Prompt).NotEmpty();
            RuleFor(x => x.StudyDayId).GreaterThan(0);
        }
    }
}
