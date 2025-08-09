namespace Halo.Application.Dtos.ListeningItem
{
    public class CreateListeningItemDto
    {
        public string Title { get; set; } = null!;
        public string AudioUrl { get; set; } = null!;
        public string? Transcript { get; set; }
        public string? FillInContent { get; set; }
        public float? Score { get; set; }
        public int StudyDayId { get; set; }
    }
}
