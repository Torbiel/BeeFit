﻿// <auto-generated />
using System;
using BeeFit.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BeeFit.API.Migrations
{
    [DbContext(typeof(BeeFitDbContext))]
    partial class BeeFitDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BeeFit.API.Models.Allergen", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Allergens");
                });

            modelBuilder.Entity("BeeFit.API.Models.Dish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Dishes");
                });

            modelBuilder.Entity("BeeFit.API.Models.DishesIngredient", b =>
                {
                    b.Property<int>("DishId")
                        .HasColumnType("int");

                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.HasKey("DishId", "IngredientId");

                    b.HasIndex("IngredientId");

                    b.ToTable("DishesIngredients");
                });

            modelBuilder.Entity("BeeFit.API.Models.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("AnimalProteins")
                        .HasColumnType("float");

                    b.Property<double?>("Calcium")
                        .HasColumnType("float");

                    b.Property<int>("Callories")
                        .HasColumnType("int");

                    b.Property<double>("Carbohydrates")
                        .HasColumnType("float");

                    b.Property<double?>("Cholesterol")
                        .HasColumnType("float");

                    b.Property<double?>("Copper")
                        .HasColumnType("float");

                    b.Property<double>("Fats")
                        .HasColumnType("float");

                    b.Property<double?>("Fiber")
                        .HasColumnType("float");

                    b.Property<double?>("Iodine")
                        .HasColumnType("float");

                    b.Property<double?>("Iron")
                        .HasColumnType("float");

                    b.Property<double?>("Magnesium")
                        .HasColumnType("float");

                    b.Property<double?>("MonounsaturatedFats")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Omega3")
                        .HasColumnType("float");

                    b.Property<double?>("Omega6")
                        .HasColumnType("float");

                    b.Property<double?>("Phosphorus")
                        .HasColumnType("float");

                    b.Property<double?>("PlantProteins")
                        .HasColumnType("float");

                    b.Property<double?>("Potassium")
                        .HasColumnType("float");

                    b.Property<double>("Proteins")
                        .HasColumnType("float");

                    b.Property<double?>("Salt")
                        .HasColumnType("float");

                    b.Property<double?>("SaturatedFats")
                        .HasColumnType("float");

                    b.Property<double?>("Selenium")
                        .HasColumnType("float");

                    b.Property<double?>("Sodium")
                        .HasColumnType("float");

                    b.Property<double>("Sugars")
                        .HasColumnType("float");

                    b.Property<int>("Unit")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<double?>("VitaminA")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB1")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB12")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB2")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB5")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB6")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB7")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminB9")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminC")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminD")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminE")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminK")
                        .HasColumnType("float");

                    b.Property<double?>("VitaminPP")
                        .HasColumnType("float");

                    b.Property<double?>("Zinc")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("BeeFit.API.Models.IngredientsAllergen", b =>
                {
                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.Property<int>("AllergenId")
                        .HasColumnType("int");

                    b.HasKey("IngredientId", "AllergenId");

                    b.HasIndex("AllergenId");

                    b.ToTable("IngredientsAllergens");
                });

            modelBuilder.Entity("BeeFit.API.Models.Meal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DishId")
                        .HasColumnType("int");

                    b.Property<int?>("IngredientsId")
                        .HasColumnType("int");

                    b.Property<double?>("Quantity")
                        .HasColumnType("float");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DishId");

                    b.HasIndex("IngredientsId");

                    b.ToTable("Meals");
                });

            modelBuilder.Entity("BeeFit.API.Models.SearchPreference", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Quantity")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("SearchPreferences");
                });

            modelBuilder.Entity("BeeFit.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("UserRole")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BeeFit.API.Models.UsersAllergen", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("AllergenId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "AllergenId");

                    b.HasIndex("AllergenId");

                    b.ToTable("UsersAllergens");
                });

            modelBuilder.Entity("BeeFit.API.Models.UsersParameter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("AbdominalCircumference")
                        .HasColumnType("float");

                    b.Property<double?>("BicepsCircumference")
                        .HasColumnType("float");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<double?>("ThighCircumference")
                        .HasColumnType("float");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<double?>("Weight")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UsersParameters");
                });

            modelBuilder.Entity("BeeFit.API.Models.UsersSearchPreference", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("SearchPreferenceId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "SearchPreferenceId");

                    b.HasIndex("SearchPreferenceId");

                    b.ToTable("UsersSearchPreferences");
                });

            modelBuilder.Entity("BeeFit.API.Models.Dish", b =>
                {
                    b.HasOne("BeeFit.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("BeeFit.API.Models.DishesIngredient", b =>
                {
                    b.HasOne("BeeFit.API.Models.Dish", "Dish")
                        .WithMany("Ingredients")
                        .HasForeignKey("DishId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.Ingredient", "Ingredient")
                        .WithMany("Dishes")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.Ingredient", b =>
                {
                    b.HasOne("BeeFit.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("BeeFit.API.Models.IngredientsAllergen", b =>
                {
                    b.HasOne("BeeFit.API.Models.Allergen", "Allergen")
                        .WithMany("Ingredients")
                        .HasForeignKey("AllergenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.Ingredient", "Ingredient")
                        .WithMany("Allergens")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.Meal", b =>
                {
                    b.HasOne("BeeFit.API.Models.Dish", "Dish")
                        .WithMany()
                        .HasForeignKey("DishId");

                    b.HasOne("BeeFit.API.Models.Ingredient", "Ingredients")
                        .WithMany()
                        .HasForeignKey("IngredientsId");
                });

            modelBuilder.Entity("BeeFit.API.Models.UsersAllergen", b =>
                {
                    b.HasOne("BeeFit.API.Models.Allergen", "Allergen")
                        .WithMany("Users")
                        .HasForeignKey("AllergenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.User", "User")
                        .WithMany("Allergens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.UsersParameter", b =>
                {
                    b.HasOne("BeeFit.API.Models.User", "User")
                        .WithMany("Parameters")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.UsersSearchPreference", b =>
                {
                    b.HasOne("BeeFit.API.Models.SearchPreference", "SearchPreference")
                        .WithMany()
                        .HasForeignKey("SearchPreferenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.User", "User")
                        .WithMany("Preferences")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
