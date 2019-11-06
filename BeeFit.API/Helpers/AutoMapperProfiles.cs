using AutoMapper;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using System.Collections.Generic;

namespace BeeFit.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForProfileDto>();

            CreateMap<UsersSearchPreference, UsersSearchPreferenceDto>()
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.SearchPreference.Name));

            CreateMap<UsersParameter, UsersParameterDto>();
            CreateMap<UsersParameterDto, UsersParameter>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<IngredientDto, Ingredient>();
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<DishDto, Dish>();
            CreateMap<Dish, DishDto>();
        }
    }
}
