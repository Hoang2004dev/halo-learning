namespace Halo.Application.Dtos.GrammarItem
{
    public class CreateGrammarItemDto
    {
        public string Topic { get; set; } = null!;
        public string Explanation { get; set; } = null!;
        public string? Exercise { get; set; }
        public string? Answer { get; set; }
        public string? Description { get; set; }

        public int StudyDayId { get; set; }
    }
}
