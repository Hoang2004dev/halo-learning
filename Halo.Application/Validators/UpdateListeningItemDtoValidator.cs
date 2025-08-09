using FluentValidation;
using Halo.Application.Dtos.ListeningItem;

namespace Halo.Application.Validators
{
    public class UpdateListeningItemDtoValidator : AbstractValidator<UpdateListeningItemDto>
    {
        public UpdateListeningItemDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.AudioUrl).NotEmpty();
        }
    }
}
