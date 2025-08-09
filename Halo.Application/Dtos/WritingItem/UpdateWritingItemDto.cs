namespace Halo.Application.Dtos.WritingItem
{
    public class UpdateWritingItemDto
    {
        public int Id { get; set; }
        public string Prompt { get; set; } = null!;
        public string? Content { get; set; }
        public string? Suggestion { get; set; }
        public string? Feedback { get; set; }
    }
}
