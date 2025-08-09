using Halo.Application.Dtos.GrammarItem;
using Halo.Application.Dtos.ListeningItem;
using Halo.Application.Dtos.SpeakingItem;
using Halo.Application.Dtos.VocabItem;
using Halo.Application.Dtos.WritingItem;
using Halo.Domain.Enums;

namespace Halo.Application.Dtos.StudyDay
{
    public class StudyDayDto
    {
        public int Id { get; set; }
        public DateTime TargetDate { get; set; }
        public StudyDayStatus Status { get; set; }
        public string? Note { get; set; }

        public List<VocabItemDto> VocabItems { get; set; } = new();
        public List<ListeningItemDto> ListeningItems { get; set; } = new();
        public List<SpeakingItemDto> SpeakingItems { get; set; } = new();
        public List<GrammarItemDto> GrammarItems { get; set; } = new();
        public List<WritingItemDto> WritingItems { get; set; } = new();
    }
}
