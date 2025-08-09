namespace Halo.Application.Dtos.WritingItem
{
    public class CreateWritingItemDto
    {
        public string Prompt { get; set; } = null!;
        public string? Content { get; set; }
        public string? Suggestion { get; set; }
        public string? Feedback { get; set; }
        public int StudyDayId { get; set; }
    }
}
