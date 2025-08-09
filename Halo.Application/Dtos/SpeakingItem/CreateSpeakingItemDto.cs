namespace Halo.Application.Dtos.SpeakingItem
{
    public class CreateSpeakingItemDto
    {
        public string Prompt { get; set; } = null!;
        public string? AudioUrl { get; set; }
        public string? TranscriptByAI { get; set; }
        public string? Feedback { get; set; }
        public int StudyDayId { get; set; }
    }
}
