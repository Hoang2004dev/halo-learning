namespace Halo.Domain.Entities
{
    public class GrammarItem
    {
        public int Id { get; set; }

        public string Topic { get; set; } = null!;
        public string Explanation { get; set; } = null!;
        public string? Exercise { get; set; } // bài tập
        public string? Answer { get; set; }   // đáp án
        public string? Description { get; set; }

        public int StudyDayId { get; set; }
        public StudyDay StudyDay { get; set; } = null!;
    }
}
