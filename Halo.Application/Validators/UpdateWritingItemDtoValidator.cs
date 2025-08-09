using FluentValidation;
using Halo.Application.Dtos.WritingItem;

namespace Halo.Application.Validators
{
    public class UpdateWritingItemDtoValidator : AbstractValidator<UpdateWritingItemDto>
    {
        public UpdateWritingItemDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Prompt).NotEmpty();
        }
    }
}
