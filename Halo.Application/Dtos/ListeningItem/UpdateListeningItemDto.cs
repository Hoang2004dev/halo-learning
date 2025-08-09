namespace Halo.Application.Dtos.ListeningItem
{
    public class UpdateListeningItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string AudioUrl { get; set; } = null!;
        public string? Transcript { get; set; }
        public string? FillInContent { get; set; }
        public float? Score { get; set; }
    }
}
