using AutoMapper;
using BeeFit.API.Dtos.Dishes;
using BeeFit.API.Dtos.Ingredients;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq;

namespace BeeFit.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            // This headers will allow Angular app to get error's headers:
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*"); // * - allow any origin
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            // Convert to camel case for handling in the SPA
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

        public static IQueryable<Dish> FilterDishes(IQueryable<Dish> dishes, FoodSearchParams searchParams)
        {
            if (searchParams.UserId != null && searchParams.UserId != 0)
            {
                dishes = dishes.Where(d => d.UserId == searchParams.UserId);
            }

            if (searchParams.MinCallories != null)
            {
                dishes = dishes.Where(d => d.Callories >= searchParams.MinCallories);
            }

            if (searchParams.MaxCallories != null)
            {
                dishes = dishes.Where(d => d.Callories <= searchParams.MaxCallories);
            }

            if (searchParams.MinFats != null)
            {
                dishes = dishes.Where(d => d.Fats >= searchParams.MinFats);
            }

            if (searchParams.MaxFats != null)
            {
                dishes = dishes.Where(d => d.Fats <= searchParams.MaxFats);
            }

            if (searchParams.MinProteins != null)
            {
                dishes = dishes.Where(d => d.Proteins >= searchParams.MinProteins);
            }

            if (searchParams.MaxProteins != null)
            {
                dishes = dishes.Where(d => d.Proteins <= searchParams.MaxProteins);
            }

            if (searchParams.MinCarbohydrates != null)
            {
                dishes = dishes.Where(d => d.Carbohydrates >= searchParams.MinCarbohydrates);
            }

            if (searchParams.MaxCarbohydrates != null)
            {
                dishes = dishes.Where(d => d.Carbohydrates <= searchParams.MaxCarbohydrates);
            }

            return dishes;
        }

        public static IQueryable<Ingredient> FilterIngredients(IQueryable<Ingredient> ingredients, FoodSearchParams searchParams)
        {
            if (searchParams.UserId != null && searchParams.UserId != 0)
            {
                ingredients = ingredients.Where(d => d.UserId == searchParams.UserId);
            }

            if (searchParams.MinCallories != null)
            {
                ingredients = ingredients.Where(d => d.Callories >= searchParams.MinCallories);
            }

            if (searchParams.MaxCallories != null)
            {
                ingredients = ingredients.Where(d => d.Callories <= searchParams.MaxCallories);
            }

            if (searchParams.MinFats != null)
            {
                ingredients = ingredients.Where(d => d.Fats >= searchParams.MinFats);
            }

            if (searchParams.MaxFats != null)
            {
                ingredients = ingredients.Where(d => d.Fats <= searchParams.MaxFats);
            }

            if (searchParams.MinProteins != null)
            {
                ingredients = ingredients.Where(d => d.Proteins >= searchParams.MinProteins);
            }

            if (searchParams.MaxProteins != null)
            {
                ingredients = ingredients.Where(d => d.Proteins <= searchParams.MaxProteins);
            }

            if (searchParams.MinCarbohydrates != null)
            {
                ingredients = ingredients.Where(d => d.Carbohydrates >= searchParams.MinCarbohydrates);
            }

            if (searchParams.MaxCarbohydrates != null)
            {
                ingredients = ingredients.Where(d => d.Carbohydrates <= searchParams.MaxCarbohydrates);
            }

            return ingredients;
        }

        public static IQueryable<Dish> SortDishes(IQueryable<Dish> dishes, FoodSearchParams searchParams)
        {
            if (searchParams.OrderBy != null)
            {
                switch (searchParams.OrderBy)
                {
                    case FoodOrderBy.Callories:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Callories) : dishes.OrderByDescending(d => d.Callories);
                            break;
                        }

                    case FoodOrderBy.Fats:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Fats) : dishes.OrderByDescending(d => d.Fats);
                            break;
                        }

                    case FoodOrderBy.Proteins:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Proteins) : dishes.OrderByDescending(d => d.Proteins);
                            break;
                        }

                    case FoodOrderBy.Carbohydrates:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Carbohydrates) : dishes.OrderByDescending(d => d.Carbohydrates);
                            break;
                        }

                    default:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Name) : dishes.OrderByDescending(d => d.Name);
                            break;
                        }
                }
            }

            return dishes;
        }

        public static IQueryable<Ingredient> SortIngredients(IQueryable<Ingredient> ingredients, FoodSearchParams searchParams)
        {
            if (searchParams.OrderBy != null)
            {
                switch (searchParams.OrderBy)
                {
                    case FoodOrderBy.Callories:
                        {
                            ingredients = searchParams.Ascending ? ingredients.OrderBy(d => d.Callories) : ingredients.OrderByDescending(d => d.Callories);
                            break;
                        }

                    case FoodOrderBy.Fats:
                        {
                            ingredients = searchParams.Ascending ? ingredients.OrderBy(d => d.Fats) : ingredients.OrderByDescending(d => d.Fats);
                            break;
                        }

                    case FoodOrderBy.Proteins:
                        {
                            ingredients = searchParams.Ascending ? ingredients.OrderBy(d => d.Proteins) : ingredients.OrderByDescending(d => d.Proteins);
                            break;
                        }

                    case FoodOrderBy.Carbohydrates:
                        {
                            ingredients = searchParams.Ascending ? ingredients.OrderBy(d => d.Carbohydrates) : ingredients.OrderByDescending(d => d.Carbohydrates);
                            break;
                        }

                    default:
                        {
                            ingredients = searchParams.Ascending ? ingredients.OrderBy(d => d.Name) : ingredients.OrderByDescending(d => d.Name);
                            break;
                        }
                }
            }

            return ingredients;
        }
    }
}
