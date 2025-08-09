namespace Halo.Application.Dtos.SpeakingItem
{
    public class SpeakingItemDto
    {
        public int Id { get; set; }
        public string Prompt { get; set; } = null!;
        public string? AudioUrl { get; set; }
        public string? TranscriptByAI { get; set; }
        public string? Feedback { get; set; }
    }
}
