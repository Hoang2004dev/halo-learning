using Halo.Application.Dtos.StudyDay;
using Halo.Domain.Enums;

namespace Halo.Application.Interfaces.Services
{
    public interface IStudyDayService
    {
        Task<StudyDayDto?> GetByIdAsync(int id);
        Task<IEnumerable<StudyDayDto>> GetAllAsync();
        Task<IEnumerable<StudyDayDto>> FilterByDateAsync(DateTime date);
        Task<StudyDayDto> CreateAsync(CreateStudyDayDto dto);
        Task<bool> UpdateAsync(UpdateStudyDayDto dto);
        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateStatusAsync(int id, StudyDayStatus newStatus);
        Task<int> UpdateOverdueStatusAsync();
        Task<int> UpdateAutoStartAsync();
    }
}
