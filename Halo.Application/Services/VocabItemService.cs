using AutoMapper;
using Halo.Application.Dtos.VocabItem;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;

namespace Halo.Application.Services
{
    public class VocabItemService : IVocabItemService
    {
        private readonly IVocabItemRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public VocabItemService(IVocabItemRepository repo, IMapper mapper, IUnitOfWork unit)
        {
            _repo = repo;
            _mapper = mapper;
            _unit = unit;
        }

        public async Task<VocabItemDto> CreateAsync(CreateVocabItemDto dto)
        {
            var entity = _mapper.Map<VocabItem>(dto);
            await _repo.AddAsync(entity);
            await _unit.SaveChangesAsync();
            return _mapper.Map<VocabItemDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<VocabItemDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<VocabItemDto>>(list);
        }

        public async Task<VocabItemDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return _mapper.Map<VocabItemDto?>(entity);
        }

        public async Task<IEnumerable<VocabItemDto>> GetByStudyDayIdAsync(int studyDayId)
        {
            var list = await _repo.GetByStudyDayIdAsync(studyDayId);
            return _mapper.Map<IEnumerable<VocabItemDto>>(list);
        }

        public async Task<bool> UpdateAsync(UpdateVocabItemDto dto)
        {
            var entity = await _repo.GetByIdAsync(dto.Id);

            if (entity == null)
                throw new NotFoundException("VocabItem", dto.Id);

            _mapper.Map(dto, entity);
            await _repo.UpdateAsync(entity);
            return await _unit.SaveChangesAsync() > 0;
        }

        public async Task<VocabItemDto?> GetRandomByStudyDayIdAsync(int studyDayId)
        {
            var item = await _repo.GetRandomByStudyDayIdAsync(studyDayId);
            return _mapper.Map<VocabItemDto?>(item);
        }

        public async Task<VocabItemDto?> GetRandomGlobalAsync()
        {
            var item = await _repo.GetRandomGlobalAsync();
            return _mapper.Map<VocabItemDto?>(item);
        }

        public async Task<VocabItemDto> UpdateStatusAsync(UpdateVocabItemStatusDto dto)
        {
            var affected = await _repo.UpdateStatusAsync(dto.Id, dto.Status);
            if (affected == 0) throw new NotFoundException("VocabItem", dto.Id);

            // Lấy lại để trả về DTO mới (hoặc trả { Id, Status } tuỳ bạn)
            var updated = await _repo.GetByIdAsync(dto.Id); // AsNoTracking khuyến nghị
            return _mapper.Map<VocabItemDto>(updated);
        }
    }
}
