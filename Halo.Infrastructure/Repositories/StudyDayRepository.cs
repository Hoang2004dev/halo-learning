using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Domain.Enums;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class StudyDayRepository : IStudyDayRepository
    {
        private readonly HaloDbContext _context;

        public StudyDayRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<StudyDay?> GetByIdAsync(int id)
        {
            return await _context.StudyDays
                .Include(s => s.VocabItems)
                .Include(s => s.ListeningItems)
                .Include(s => s.SpeakingItems)
                .Include(s => s.GrammarItems)
                .Include(s => s.WritingItems)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<StudyDay>> GetAllAsync()
        {
            return await _context.StudyDays
                .Include(s => s.VocabItems)
                .Include(s => s.ListeningItems)
                .Include(s => s.SpeakingItems)
                .Include(s => s.GrammarItems)
                .Include(s => s.WritingItems)
                .ToListAsync();
        }

        public async Task<IEnumerable<StudyDay>> GetAllByUserIdAsync(Guid userId)
        {
            return await _context.StudyDays
                .Where(s => s.UserId == userId)
                .Include(s => s.VocabItems)
                .Include(s => s.ListeningItems)
                .Include(s => s.SpeakingItems)
                .Include(s => s.GrammarItems)
                .Include(s => s.WritingItems)
                .ToListAsync();
        }

        public async Task<IEnumerable<StudyDay>> FilterByUserAndDateAsync(Guid userId, DateTime date)
        {
            return await _context.StudyDays
                .Where(s => s.UserId == userId && s.TargetDate.Date == date.Date)
                .Include(s => s.VocabItems)
                .Include(s => s.ListeningItems)
                .Include(s => s.SpeakingItems)
                .Include(s => s.GrammarItems)
                .Include(s => s.WritingItems)
                .ToListAsync();
        }

        public async Task<IEnumerable<StudyDay>> FilterByDateAsync(DateTime date)
        {
            return await _context.StudyDays
                .Where(s => s.TargetDate.Date == date.Date)
                .Include(s => s.VocabItems)
                .Include(s => s.ListeningItems)
                .Include(s => s.SpeakingItems)
                .Include(s => s.GrammarItems)
                .Include(s => s.WritingItems)
                .ToListAsync();
        }

        public async Task AddAsync(StudyDay studyDay)
        {
            await _context.StudyDays.AddAsync(studyDay);
        }

        public Task UpdateAsync(StudyDay studyDay)
        {
            _context.StudyDays.Update(studyDay);
            return Task.CompletedTask;
        }

        public async Task<List<StudyDay>> GetOverdueCandidatesAsync(DateTime today)
        {
            return await _context.StudyDays
                .Where(s =>
                    s.Status != StudyDayStatus.Completed &&
                    s.Status != StudyDayStatus.Overdue &&
                    s.TargetDate < today)
                .ToListAsync();
        }

        public async Task<List<StudyDay>> GetAutoStartCandidatesAsync(DateTime today)
        {
            return await _context.StudyDays
                .Where(s =>
                    s.Status == StudyDayStatus.NotStarted &&
                    s.TargetDate == today)
                .ToListAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.StudyDays.FindAsync(id);
            if (entity != null)
            {
                _context.StudyDays.Remove(entity);
            }
        }
    }
}
