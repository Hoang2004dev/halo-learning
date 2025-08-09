using AutoMapper;
using Halo.Application.Dtos.GrammarItem;
using Halo.Application.Dtos.ListeningItem;
using Halo.Application.Dtos.SpeakingItem;
using Halo.Application.Dtos.StudyDay;
using Halo.Application.Dtos.VocabItem;
using Halo.Application.Dtos.WritingItem;
using Halo.Domain.Entities;

namespace Halo.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // StudyDay
            CreateMap<StudyDay, StudyDayDto>();
            CreateMap<CreateStudyDayDto, StudyDay>();
            CreateMap<UpdateStudyDayDto, StudyDay>();

            // VocabItem
            CreateMap<VocabItem, VocabItemDto>();
            CreateMap<CreateVocabItemDto, VocabItem>();
            CreateMap<UpdateVocabItemDto, VocabItem>()
                .ForMember(dest => dest.StudyDayId, opt => opt.Ignore());

            // ListeningItem
            CreateMap<ListeningItem, ListeningItemDto>();
            CreateMap<CreateListeningItemDto, ListeningItem>();
            CreateMap<UpdateListeningItemDto, ListeningItem>();

            // SpeakingItem
            CreateMap<SpeakingItem, SpeakingItemDto>();
            CreateMap<CreateSpeakingItemDto, SpeakingItem>();
            CreateMap<UpdateSpeakingItemDto, SpeakingItem>();

            // GrammarItem
            CreateMap<GrammarItem, GrammarItemDto>();
            CreateMap<CreateGrammarItemDto, GrammarItem>();
            CreateMap<UpdateGrammarItemDto, GrammarItem>();

            // WritingItem
            CreateMap<WritingItem, WritingItemDto>();
            CreateMap<CreateWritingItemDto, WritingItem>();
            CreateMap<UpdateWritingItemDto, WritingItem>();
        }
    }
}
