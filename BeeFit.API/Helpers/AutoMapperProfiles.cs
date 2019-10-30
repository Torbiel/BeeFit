using AutoMapper;
using BeeFit.API.Dtos;
using BeeFit.API.Models;

namespace BeeFit.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForProfileDto>();

            CreateMap<UsersAllergen, UsersAllergenForListDto>()
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.Allergen.Name));

            CreateMap<UsersSearchPreference, UsersSearchPreferenceForListDto>()
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.SearchPreference.Name))
                .ForMember(x => x.Quantity, opt => opt.MapFrom(src => src.SearchPreference.Quantity));

            CreateMap<UsersParameter, UsersParameterForListDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<IngredientDto, Ingredient>();
            CreateMap<Ingredient, IngredientDto>();
        }
    }
}
