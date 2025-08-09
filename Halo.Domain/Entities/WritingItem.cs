namespace Halo.Domain.Entities
{
    public class WritingItem
    {
        public int Id { get; set; }

        public string Prompt { get; set; } = null!;
        public string? Content { get; set; } // bài viết
        public string? Suggestion { get; set; } // dàn ý, gợi ý
        public string? Feedback { get; set; } // tự đánh giá

        public int StudyDayId { get; set; }
        public StudyDay StudyDay { get; set; } = null!;
    }
}
