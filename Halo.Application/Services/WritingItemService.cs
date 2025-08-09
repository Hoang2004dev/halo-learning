using AutoMapper;
using Halo.Application.Dtos.WritingItem;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;

namespace Halo.Application.Services
{
    public class WritingItemService : IWritingItemService
    {
        private readonly IWritingItemRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public WritingItemService(IWritingItemRepository repo, IMapper mapper, IUnitOfWork unit)
        {
            _repo = repo;
            _mapper = mapper;
            _unit = unit;
        }

        public async Task<WritingItemDto> CreateAsync(CreateWritingItemDto dto)
        {
            var entity = _mapper.Map<WritingItem>(dto);
            await _repo.AddAsync(entity);
            await _unit.SaveChangesAsync();
            return _mapper.Map<WritingItemDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<WritingItemDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<WritingItemDto>>(list);
        }

        public async Task<WritingItemDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return _mapper.Map<WritingItemDto?>(entity);
        }

        public async Task<IEnumerable<WritingItemDto>> GetByStudyDayIdAsync(int studyDayId)
        {
            var list = await _repo.GetByStudyDayIdAsync(studyDayId);
            return _mapper.Map<IEnumerable<WritingItemDto>>(list);
        }

        public async Task<bool> UpdateAsync(UpdateWritingItemDto dto)
        {
            var entity = _mapper.Map<WritingItem>(dto);
            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }
    }
}
