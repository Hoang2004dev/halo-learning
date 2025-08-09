using FluentValidation;
using Halo.Application.Dtos.StudyDay;

namespace Halo.Application.Validators
{
    public class CreateStudyDayDtoValidator : AbstractValidator<CreateStudyDayDto>
    {
        public CreateStudyDayDtoValidator()
        {
            RuleFor(x => x.TargetDate)
                .NotEmpty().WithMessage("Target date is required.")
                .GreaterThanOrEqualTo(DateTime.Today).WithMessage("Date cannot be in the past.");
        }
    }
}
