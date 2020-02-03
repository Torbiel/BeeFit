using AutoMapper;
using BeeFit.API.Dtos;
using BeeFit.API.Dtos.Dishes;
using BeeFit.API.Dtos.DishesIngredients;
using BeeFit.API.Dtos.Ingredients;
using BeeFit.API.Dtos.IngredientsSearchPreference;
using BeeFit.API.Dtos.Meals;
using BeeFit.API.Dtos.SearchPreferences;
using BeeFit.API.Dtos.Targets;
using BeeFit.API.Dtos.User;
using BeeFit.API.Dtos.UsersParameters;
using BeeFit.API.Dtos.UsersSearchPreferences;
using BeeFit.API.Models;
using BeeFit.API.Models.Enums;
using System;
using System.Linq;

namespace BeeFit.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // User
            CreateMap<User, UserForProfileDto>();
            CreateMap<UserForUpdateDto, User>();

            // Ingredient
            CreateMap<IngredientForAddDto, Ingredient>();
            CreateMap<Ingredient, IngredientForGetDto>().ForMember(x => x.Unit, opt => opt.MapFrom(o => o.Unit.ToString()));
            CreateMap<IngredientForUpdateDto, Ingredient>();

            // Helper mapping for converting Unit to string
            CreateMap<Unit, string>().ConvertUsing(x => x.ToString());

            // Helper mapping for rounding floats
            CreateMap<float, float>().ConvertUsing(x => (float)Math.Round(x, 2));

            // Helper mapping for converting dates to simple format (dd/MM/yyyy)
            CreateMap<DateTime, DateTime>().ConvertUsing(x => DateTime.Parse(x.GetDateTimeFormats('d').FirstOrDefault()));

            // IngredientsSearchPreference
            CreateMap<IngredientsSearchPreferenceForAddDto, IngredientsSearchPreference>();
            CreateMap<IngredientsSearchPreference, IngredientsSearchPreferenceForGetDto>();
            CreateMap<IngredientsSearchPreferenceForUpdateDto, IngredientsSearchPreference>();

            // Dish
            CreateMap<DishForAddDto, Dish>();
            CreateMap<Dish, DishForGetDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(d => d.Id));
            CreateMap<DishForUpdateDto, Dish>();
            CreateMap<DishForUpdateDto, DishForAddDto>();

            // DishesIngredient
            CreateMap<DishesIngredientForAddDto, DishesIngredient>().ForMember(x => x.Ingredient, opt => opt.Ignore());
            CreateMap<DishesIngredient, DishesIngredientForGetDto>();
            CreateMap<DishesIngredientForUpdateDto, DishesIngredient>();

            // SearchPreference
            CreateMap<SearchPreference, SearchPreferenceForGetDto>();

            // Target
            CreateMap<TargetForAddDto, Target>();
            CreateMap<Target, TargetForGetDto>();
            CreateMap<TargetForUpdateDto, Target>();

            // Meal
            CreateMap<MealForAddDto, Meal>();
            CreateMap<Meal, MealForGetDto>();
            CreateMap<MealForUpdateDto, Meal>();

            // UsersSearchPreference
            CreateMap<UsersSearchPreferenceForAddDto, UsersSearchPreference>();
            CreateMap<UsersSearchPreference, UsersSearchPreferenceForGetDto>();
            CreateMap<UsersSearchPreferenceForUpdateDto, UsersSearchPreference>();

            // UsersParameter
            CreateMap<UsersParameterForAddDto, UsersParameter>();
            CreateMap<UsersParameter, UsersParameterForGetDto>();
            CreateMap<UsersParameterForUpdateDto, UsersParameter>();
        }
    }
}
