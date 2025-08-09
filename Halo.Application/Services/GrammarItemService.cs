using AutoMapper;
using Halo.Application.Dtos.GrammarItem;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;

namespace Halo.Application.Services
{
    public class GrammarItemService : IGrammarItemService
    {
        private readonly IGrammarItemRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public GrammarItemService(IGrammarItemRepository repo, IMapper mapper, IUnitOfWork unit)
        {
            _repo = repo;
            _mapper = mapper;
            _unit = unit;
        }

        public async Task<GrammarItemDto> CreateAsync(CreateGrammarItemDto dto)
        {
            var entity = _mapper.Map<GrammarItem>(dto);
            await _repo.AddAsync(entity);
            await _unit.SaveChangesAsync();
            return _mapper.Map<GrammarItemDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<GrammarItemDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<GrammarItemDto>>(list);
        }

        public async Task<GrammarItemDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return _mapper.Map<GrammarItemDto?>(entity);
        }

        public async Task<IEnumerable<GrammarItemDto>> GetByStudyDayIdAsync(int studyDayId)
        {
            var list = await _repo.GetByStudyDayIdAsync(studyDayId);
            return _mapper.Map<IEnumerable<GrammarItemDto>>(list);
        }

        public async Task<bool> UpdateAsync(UpdateGrammarItemDto dto)
        {
            var entity = await _repo.GetByIdAsync(dto.Id);

            if (entity == null)
                throw new NotFoundException("GrammarItem", dto.Id);

            _mapper.Map(dto, entity);
            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }
    }
}
