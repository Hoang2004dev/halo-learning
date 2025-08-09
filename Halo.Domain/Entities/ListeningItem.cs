namespace Halo.Domain.Entities
{
    public class ListeningItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string AudioUrl { get; set; } = null!; // File upload/audio path
        public string? Transcript { get; set; }
        public string? FillInContent { get; set; } // Nội dung điền vào
        public float? Score { get; set; } // optional score

        public int StudyDayId { get; set; }
        public StudyDay StudyDay { get; set; } = null!;
    }
}
