using Halo.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Halo.Application.Dtos.VocabItem
{
    public sealed class UpdateVocabItemStatusDto
    {
        public int Id { get; set; }
        public VocabStatus Status { get; set; }
    }
}
