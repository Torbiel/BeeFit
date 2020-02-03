using BeeFit.API.Dtos.IngredientsSearchPreference;
using BeeFit.API.Models.Enums;
using System.Collections.Generic;

namespace BeeFit.API.Dtos.Ingredients
{
    public class IngredientForUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public int UserId { get; set; }
        public Unit Unit { get; set; }
        public float GramsPerUnit { get; set; }
        public virtual ICollection<IngredientsSearchPreferenceForUpdateDto> SearchPreferences { get; set; }
        public float Callories { get; set; }
        public float Fats { get; set; }
        public float Carbohydrates { get; set; }
        public float Sugars { get; set; }
        public float Proteins { get; set; }
        public float? AnimalProteins { get; set; }
        public float? PlantProteins { get; set; }
        public float? SaturatedFats { get; set; }
        public float? MonounsaturatedFats { get; set; }
        // PolyunsaturatedFats = Omega3 + Omega6
        public float? Omega3 { get; set; }
        public float? Omega6 { get; set; }
        public float? Fiber { get; set; }
        public float? Salt { get; set; }
        public float? Cholesterol { get; set; }
        public float? VitaminA { get; set; }
        public float? VitaminB1 { get; set; }
        public float? VitaminB2 { get; set; }
        public float? VitaminB5 { get; set; }
        public float? VitaminB6 { get; set; }
        public float? VitaminB7 { get; set; }
        public float? VitaminB9 { get; set; }
        public float? VitaminB12 { get; set; }
        public float? VitaminC { get; set; }
        public float? VitaminD { get; set; }
        public float? VitaminE { get; set; }
        public float? VitaminPP { get; set; }
        public float? VitaminK { get; set; }
        public float? Zinc { get; set; }
        public float? Phosphorus { get; set; }
        public float? Iodine { get; set; }
        public float? Magnesium { get; set; }
        public float? Copper { get; set; }
        public float? Potassium { get; set; }
        public float? Selenium { get; set; }
        public float? Sodium { get; set; }
        public float? Calcium { get; set; }
        public float? Iron { get; set; }
    }
}
