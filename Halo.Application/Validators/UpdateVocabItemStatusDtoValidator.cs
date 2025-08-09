using FluentValidation;
using Halo.Application.Dtos.VocabItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Halo.Application.Validators
{
    public class UpdateVocabItemStatusDtoValidator : AbstractValidator<UpdateVocabItemStatusDto>
    {
        public UpdateVocabItemStatusDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}
