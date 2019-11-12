using AutoMapper;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Http;

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

            CreateMap<TargetForAddDto, Target>();
            CreateMap<Target, TargetForGetDto>();
            CreateMap<TargetForUpdateDto, Target>();

            CreateMap<Meal, MealDto>();
            CreateMap<MealDto, Meal>();

            CreateMap<UserForProfileDto, User>();

            CreateMap<DishesIngredient, DishesIngredientForDishDto>()
                .ForMember(di => di.Dish, opt => opt.Ignore())
                .ForMember(di => di.DishId, opt => opt.Ignore());
            CreateMap<DishesIngredientForDishDto, DishesIngredient>();

            CreateMap<Ingredient, IngredientForDishDto>();
            CreateMap<IngredientForDishDto, Ingredient>();

            CreateMap<IngredientsSearchPreference, IngredientsSearchPreferenceForDishDto>()
                .ForMember(i => i.Ingredient, opt => opt.Ignore())
                .ForMember(i => i.IngredientId, opt => opt.Ignore());
            CreateMap<IngredientsSearchPreferenceForDishDto, IngredientsSearchPreference>();

            CreateMap<SearchPreferenceDto, SearchPreference>();
            CreateMap<SearchPreference, SearchPreferenceDto>();

            CreateMap<DishForMealAddDto, Dish>();

        }
    }
}
