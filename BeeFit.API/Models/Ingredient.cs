using BeeFit.API.Dtos;
using BeeFit.API.Models.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeeFit.API.Models
{
    public class Ingredient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Brand { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public Unit Unit { get; set; }
        public int GramsPerUnit { get; set; }
        public virtual ICollection<DishesIngredient> Dishes { get; set; }
        public virtual ICollection<IngredientsSearchPreference> SearchPreferences { get; set; }
        public int Callories { get; set; }
        public double Fats { get; set; }
        public double Carbohydrates { get; set; }
        public double Sugars { get; set; }
        public double Proteins { get; set; }
        public double? AnimalProteins { get; set; }
        public double? PlantProteins { get; set; }
        public double? SaturatedFats { get; set; }
        public double? MonounsaturatedFats { get; set; }
        // PolyunsaturatedFats = Omega3 + Omega6
        public double? Omega3 { get; set; }
        public double? Omega6 { get; set; }
        public double? Fiber { get; set; }
        public double? Salt { get; set; }
        public double? Cholesterol { get; set; }
        public double? VitaminA { get; set; }
        public double? VitaminB1 { get; set; }
        public double? VitaminB2 { get; set; }
        public double? VitaminB5 { get; set; }
        public double? VitaminB6 { get; set; }
        public double? VitaminB7 { get; set; }
        public double? VitaminB9 { get; set; }
        public double? VitaminB12 { get; set; }
        public double? VitaminC { get; set; }
        public double? VitaminD { get; set; }
        public double? VitaminE { get; set; }
        public double? VitaminPP { get; set; }
        public double? VitaminK { get; set; }
        public double? Zinc { get; set; }
        public double? Phosphorus { get; set; }
        public double? Iodine { get; set; }
        public double? Magnesium { get; set; }
        public double? Copper { get; set; }
        public double? Potassium { get; set; }
        public double? Selenium { get; set; }
        public double? Sodium { get; set; }
        public double? Calcium { get; set; }
        public double? Iron { get; set; }
    }
}
