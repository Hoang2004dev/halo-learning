namespace Halo.Domain.Entities
{
    public class SpeakingItem
    {
        public int Id { get; set; }

        public string Prompt { get; set; } = null!;
        public string? AudioUrl { get; set; } // file ghi âm
        public string? TranscriptByAI { get; set; } // optional

        public string? Feedback { get; set; } // tự ghi nhận xét

        public int StudyDayId { get; set; }
        public StudyDay StudyDay { get; set; } = null!;
    }
}
