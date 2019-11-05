using BeeFit.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BeeFit.API.Data
{
    public class BeeFitDbContext : DbContext
    {
        public BeeFitDbContext(DbContextOptions<BeeFitDbContext> options) : base(options) { }

        public DbSet<SearchPreference> SearchPreferences { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<DishesIngredient> DishesIngredients { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<IngredientsSearchPreference> IngredientsSearchPreferences { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UsersParameter> UsersParameters { get; set; }
        public DbSet<UsersSearchPreference> UsersSearchPreferences { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DishesIngredient>().HasKey(k => new { k.DishId, k.IngredientId });
            modelBuilder.Entity<UsersSearchPreference>().HasKey(k => new { k.UserId, k.SearchPreferenceId });
            modelBuilder.Entity<IngredientsSearchPreference>().HasKey(k => new { k.IngredientId, k.SearchPreferenceId });
        }
    }
}
