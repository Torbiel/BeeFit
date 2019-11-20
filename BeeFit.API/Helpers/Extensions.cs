using AutoMapper;
using BeeFit.API.Dtos.Dishes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

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
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

        public static void CalculateNutrients(this DishForGetDto dish)
        {
            float callories = 0;
            float fats = 0;
            float carbohydrates = 0;
            float proteins = 0;

            foreach (var ing in dish.Ingredients)
            {
                callories += (ing.Ingredient.Callories / 100) * ing.Quantity;
                fats += (ing.Ingredient.Fats / 100) * ing.Quantity;
                carbohydrates += (ing.Ingredient.Carbohydrates / 100) * ing.Quantity;
                proteins += (ing.Ingredient.Proteins / 100) * ing.Quantity;
            }

            dish.Callories = callories;
            dish.Fats = fats;
            dish.Carbohydrates = carbohydrates;
            dish.Proteins = proteins;
        }   
    }
}
