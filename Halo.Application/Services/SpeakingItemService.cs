using AutoMapper;
using Halo.Application.Dtos.SpeakingItem;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;

namespace Halo.Application.Services
{
    public class SpeakingItemService : ISpeakingItemService
    {
        private readonly ISpeakingItemRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public SpeakingItemService(ISpeakingItemRepository repo, IMapper mapper, IUnitOfWork unit)
        {
            _repo = repo;
            _mapper = mapper;
            _unit = unit;
        }

        public async Task<SpeakingItemDto> CreateAsync(CreateSpeakingItemDto dto)
        {
            var entity = _mapper.Map<SpeakingItem>(dto);
            await _repo.AddAsync(entity);
            await _unit.SaveChangesAsync();
            return _mapper.Map<SpeakingItemDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<SpeakingItemDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<SpeakingItemDto>>(list);
        }

        public async Task<SpeakingItemDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return _mapper.Map<SpeakingItemDto?>(entity);
        }

        public async Task<IEnumerable<SpeakingItemDto>> GetByStudyDayIdAsync(int studyDayId)
        {
            var list = await _repo.GetByStudyDayIdAsync(studyDayId);
            return _mapper.Map<IEnumerable<SpeakingItemDto>>(list);
        }

        public async Task<bool> UpdateAsync(UpdateSpeakingItemDto dto)
        {
            var entity = _mapper.Map<SpeakingItem>(dto);
            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }
    }
}
