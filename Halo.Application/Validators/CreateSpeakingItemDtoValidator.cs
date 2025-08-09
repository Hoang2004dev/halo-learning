using FluentValidation;
using Halo.Application.Dtos.SpeakingItem;

namespace Halo.Application.Validators
{
    public class CreateSpeakingItemDtoValidator : AbstractValidator<CreateSpeakingItemDto>
    {
        public CreateSpeakingItemDtoValidator()
        {
            RuleFor(x => x.Prompt).NotEmpty();
            RuleFor(x => x.StudyDayId).GreaterThan(0);
        }
    }
}
