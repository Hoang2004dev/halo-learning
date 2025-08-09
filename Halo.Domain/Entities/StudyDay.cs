using Halo.Domain.Enums;

namespace Halo.Domain.Entities
{
    public class StudyDay
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }
        public DateTime TargetDate { get; set; }

        public StudyDayStatus Status { get; set; } = StudyDayStatus.NotStarted;
        public string? Note { get; set; }

        public User User { get; set; } = null!;
        public ICollection<VocabItem> VocabItems { get; set; } = new List<VocabItem>();
        public ICollection<ListeningItem> ListeningItems { get; set; } = new List<ListeningItem>();
        public ICollection<SpeakingItem> SpeakingItems { get; set; } = new List<SpeakingItem>();
        public ICollection<GrammarItem> GrammarItems { get; set; } = new List<GrammarItem>();
        public ICollection<WritingItem> WritingItems { get; set; } = new List<WritingItem>();
    }
}
