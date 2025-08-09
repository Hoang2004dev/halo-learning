using AutoMapper;
using Halo.Application.Dtos.StudyDay;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;
using Halo.Domain.Enums;

namespace Halo.Application.Services
{
    public class StudyDayService : IStudyDayService
    {
        private readonly IStudyDayRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;
        private readonly ICurrentUserService _currentUser;

        public StudyDayService(
            IStudyDayRepository repo,
            IMapper mapper,
            IUnitOfWork unit,
            ICurrentUserService currentUser)
        {
            _repo = repo;
            _mapper = mapper;
            _unit = unit;
            _currentUser = currentUser;
        }

        public async Task<StudyDayDto> CreateAsync(CreateStudyDayDto dto)
        {
            var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

            var entity = _mapper.Map<StudyDay>(dto);
            entity.UserId = userId;

            await _repo.AddAsync(entity);
            await _unit.SaveChangesAsync();

            return _mapper.Map<StudyDayDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<StudyDayDto>> FilterByDateAsync(DateTime date)
        {
            var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

            var list = await _repo.FilterByUserAndDateAsync(userId, date);
            return _mapper.Map<IEnumerable<StudyDayDto>>(list);
        }

        public async Task<IEnumerable<StudyDayDto>> GetAllAsync()
        {
            var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

            var list = await _repo.GetAllByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<StudyDayDto>>(list);
        }

        public async Task<StudyDayDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return _mapper.Map<StudyDayDto?>(entity);
        }

        public async Task<bool> UpdateAsync(UpdateStudyDayDto dto)
        {
            var entity = await _repo.GetByIdAsync(dto.Id);
            if (entity == null) return false;

            entity.TargetDate = dto.TargetDate;
            entity.Note = dto.Note;
            entity.Status = dto.Status;

            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateStatusAsync(int id, StudyDayStatus newStatus)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            if (entity.TargetDate < DateTime.Today)
                throw new ForbiddenException("Cannot update status of past study day.");

            entity.Status = newStatus;
            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<int> UpdateOverdueStatusAsync()
        {
            var today = DateTime.Today;
            var overdueItems = await _repo.GetOverdueCandidatesAsync(today);

            foreach (var item in overdueItems)
            {
                item.Status = StudyDayStatus.Overdue;
            }

            return await _unit.SaveChangesAsync();
        }

        public async Task<int> UpdateAutoStartAsync()
        {
            var today = DateTime.Today;
            var candidates = await _repo.GetAutoStartCandidatesAsync(today);

            foreach (var item in candidates)
            {
                item.Status = StudyDayStatus.InProgress;
            }

            return await _unit.SaveChangesAsync();
        }
    }
}
