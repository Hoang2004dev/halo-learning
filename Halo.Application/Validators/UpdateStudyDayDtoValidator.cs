using FluentValidation;
using Halo.Application.Dtos.StudyDay;

namespace Halo.Application.Validators
{
    public class UpdateStudyDayDtoValidator : AbstractValidator<UpdateStudyDayDto>
    {
        public UpdateStudyDayDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.TargetDate)
                .NotEmpty().WithMessage("Target date is required.");
            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("Invalid status value.");
        }
    }
}
