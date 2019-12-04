﻿// <auto-generated />
using System;
using BeeFit.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BeeFit.API.Migrations
{
    [DbContext(typeof(BeeFitDbContext))]
    [Migration("20191122113720_PolyunsaturatedFatsAddedToIngredient")]
    partial class PolyunsaturatedFatsAddedToIngredient
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BeeFit.API.Models.Dish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
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

                    b.Property<float>("Quantity")
                        .HasColumnType("real");

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

                    b.Property<float?>("AnimalProteins")
                        .HasColumnType("real");

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Calcium")
                        .HasColumnType("real");

                    b.Property<float>("Callories")
                        .HasColumnType("real");

                    b.Property<float>("Carbohydrates")
                        .HasColumnType("real");

                    b.Property<float?>("Cholesterol")
                        .HasColumnType("real");

                    b.Property<float?>("Copper")
                        .HasColumnType("real");

                    b.Property<float>("Fats")
                        .HasColumnType("real");

                    b.Property<float?>("Fiber")
                        .HasColumnType("real");

                    b.Property<float>("GramsPerUnit")
                        .HasColumnType("real");

                    b.Property<float?>("Iodine")
                        .HasColumnType("real");

                    b.Property<float?>("Iron")
                        .HasColumnType("real");

                    b.Property<float?>("Magnesium")
                        .HasColumnType("real");

                    b.Property<float?>("MonounsaturatedFats")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Omega3")
                        .HasColumnType("real");

                    b.Property<float?>("Omega6")
                        .HasColumnType("real");

                    b.Property<float?>("Phosphorus")
                        .HasColumnType("real");

                    b.Property<float?>("PlantProteins")
                        .HasColumnType("real");

                    b.Property<float?>("Potassium")
                        .HasColumnType("real");

                    b.Property<float>("Proteins")
                        .HasColumnType("real");

                    b.Property<float?>("Salt")
                        .HasColumnType("real");

                    b.Property<float?>("SaturatedFats")
                        .HasColumnType("real");

                    b.Property<float?>("Selenium")
                        .HasColumnType("real");

                    b.Property<float?>("Sodium")
                        .HasColumnType("real");

                    b.Property<float>("Sugars")
                        .HasColumnType("real");

                    b.Property<int>("Unit")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<float?>("VitaminA")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB1")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB12")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB2")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB5")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB6")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB7")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminB9")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminC")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminD")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminE")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminK")
                        .HasColumnType("real");

                    b.Property<float?>("VitaminPP")
                        .HasColumnType("real");

                    b.Property<float?>("Zinc")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("BeeFit.API.Models.IngredientsSearchPreference", b =>
                {
                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.Property<int>("SearchPreferenceId")
                        .HasColumnType("int");

                    b.HasKey("IngredientId", "SearchPreferenceId");

                    b.HasIndex("SearchPreferenceId");

                    b.ToTable("IngredientsSearchPreferences");
                });

            modelBuilder.Entity("BeeFit.API.Models.Meal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("DishId")
                        .HasColumnType("int");

                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.Property<float?>("Quantity")
                        .HasColumnType("real");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DishId");

                    b.HasIndex("IngredientId");

                    b.HasIndex("UserId");

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

                    b.Property<int>("PreferenceType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("SearchPreferences");
                });

            modelBuilder.Entity("BeeFit.API.Models.Target", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Callories")
                        .HasColumnType("real");

                    b.Property<float>("Carbohydrates")
                        .HasColumnType("real");

                    b.Property<float>("ChangePerWeek")
                        .HasColumnType("real");

                    b.Property<int>("DayActivity")
                        .HasColumnType("int");

                    b.Property<DateTime>("EstimatedEnd")
                        .HasColumnType("datetime2");

                    b.Property<float>("Fats")
                        .HasColumnType("real");

                    b.Property<float>("Proteins")
                        .HasColumnType("real");

                    b.Property<int>("TrainingActivity")
                        .HasColumnType("int");

                    b.Property<float>("WeightFrom")
                        .HasColumnType("real");

                    b.Property<float>("WeightTo")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Targets");
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

                    b.Property<int?>("TargetId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TargetId");

                    b.ToTable("Users");
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
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.IngredientsSearchPreference", b =>
                {
                    b.HasOne("BeeFit.API.Models.Ingredient", "Ingredient")
                        .WithMany("SearchPreferences")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.SearchPreference", "SearchPreference")
                        .WithMany("Ingredients")
                        .HasForeignKey("SearchPreferenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.Meal", b =>
                {
                    b.HasOne("BeeFit.API.Models.Dish", "Dish")
                        .WithMany()
                        .HasForeignKey("DishId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.Ingredient", "Ingredient")
                        .WithMany()
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeeFit.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeeFit.API.Models.User", b =>
                {
                    b.HasOne("BeeFit.API.Models.Target", "Target")
                        .WithMany()
                        .HasForeignKey("TargetId");
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
                        .WithMany("Users")
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