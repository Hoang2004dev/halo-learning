using AutoMapper;
using Halo.Application.Dtos.ListeningItem;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;

namespace Halo.Application.Services
{
    public class ListeningItemService : IListeningItemService
    {
        private readonly IListeningItemRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public ListeningItemService(IListeningItemRepository repo, IMapper mapper, IUnitOfWork unit)
        {
            _repo = repo;
            _mapper = mapper;
            _unit = unit;
        }

        public async Task<ListeningItemDto> CreateAsync(CreateListeningItemDto dto)
        {
            var entity = _mapper.Map<ListeningItem>(dto);
            await _repo.AddAsync(entity);
            await _unit.SaveChangesAsync();
            return _mapper.Map<ListeningItemDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<ListeningItemDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<ListeningItemDto>>(list);
        }

        public async Task<ListeningItemDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return _mapper.Map<ListeningItemDto?>(entity);
        }

        public async Task<IEnumerable<ListeningItemDto>> GetByStudyDayIdAsync(int studyDayId)
        {
            var list = await _repo.GetByStudyDayIdAsync(studyDayId);
            return _mapper.Map<IEnumerable<ListeningItemDto>>(list);
        }

        public async Task<bool> UpdateAsync(UpdateListeningItemDto dto)
        {
            var entity = _mapper.Map<ListeningItem>(dto);
            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }
    }
}
