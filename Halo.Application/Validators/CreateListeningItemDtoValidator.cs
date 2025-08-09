using FluentValidation;
using Halo.Application.Dtos.ListeningItem;

namespace Halo.Application.Validators
{
    public class CreateListeningItemDtoValidator : AbstractValidator<CreateListeningItemDto>
    {
        public CreateListeningItemDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.AudioUrl).NotEmpty();
            RuleFor(x => x.StudyDayId).GreaterThan(0);
        }
    }
}
