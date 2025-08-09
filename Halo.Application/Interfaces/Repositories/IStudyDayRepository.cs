using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Repositories
{
    public interface IStudyDayRepository
    {
        Task<StudyDay?> GetByIdAsync(int id);
        Task<IEnumerable<StudyDay>> GetAllAsync();
        Task<IEnumerable<StudyDay>> FilterByDateAsync(DateTime date);
        Task<IEnumerable<StudyDay>> GetAllByUserIdAsync(Guid userId);
        Task<IEnumerable<StudyDay>> FilterByUserAndDateAsync(Guid userId, DateTime date);
        Task AddAsync(StudyDay studyDay);
        Task UpdateAsync(StudyDay studyDay);
        Task<List<StudyDay>> GetOverdueCandidatesAsync(DateTime today);
        Task<List<StudyDay>> GetAutoStartCandidatesAsync(DateTime today);
        Task DeleteAsync(int id);
    }
}
