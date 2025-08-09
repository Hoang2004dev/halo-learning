using FluentValidation;
using Halo.Application.Dtos.SpeakingItem;

namespace Halo.Application.Validators
{
    public class UpdateSpeakingItemDtoValidator : AbstractValidator<UpdateSpeakingItemDto>
    {
        public UpdateSpeakingItemDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Prompt).NotEmpty();
        }
    }
}
