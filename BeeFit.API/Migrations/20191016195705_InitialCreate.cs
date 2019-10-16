using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Allergens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Allergens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SearchPreferences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Quantity = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchPreferences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: false),
                    PasswordSalt = table.Column<byte[]>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    LastActive = table.Column<DateTime>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    Height = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dishes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dishes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dishes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    UserId = table.Column<int>(nullable: true),
                    Unit = table.Column<int>(nullable: false),
                    Callories = table.Column<int>(nullable: false),
                    AnimalProteins = table.Column<double>(nullable: true),
                    PlantProteins = table.Column<double>(nullable: true),
                    SaturatedFats = table.Column<double>(nullable: true),
                    MonounsaturatedFats = table.Column<double>(nullable: true),
                    Omega3 = table.Column<double>(nullable: true),
                    Omega6 = table.Column<double>(nullable: true),
                    Carbohydrates = table.Column<double>(nullable: true),
                    Sugars = table.Column<double>(nullable: true),
                    Fiber = table.Column<double>(nullable: true),
                    Salt = table.Column<double>(nullable: true),
                    Cholesterol = table.Column<double>(nullable: true),
                    VitaminA = table.Column<double>(nullable: true),
                    VitaminB1 = table.Column<double>(nullable: true),
                    VitaminB2 = table.Column<double>(nullable: true),
                    VitaminB5 = table.Column<double>(nullable: true),
                    VitaminB6 = table.Column<double>(nullable: true),
                    VitaminB7 = table.Column<double>(nullable: true),
                    VitaminB9 = table.Column<double>(nullable: true),
                    VitaminB12 = table.Column<double>(nullable: true),
                    VitaminC = table.Column<double>(nullable: true),
                    VitaminD = table.Column<double>(nullable: true),
                    VitaminE = table.Column<double>(nullable: true),
                    VitaminPP = table.Column<double>(nullable: true),
                    VitaminK = table.Column<double>(nullable: true),
                    Zinc = table.Column<double>(nullable: true),
                    Phosphorus = table.Column<double>(nullable: true),
                    Iodine = table.Column<double>(nullable: true),
                    Magnesium = table.Column<double>(nullable: true),
                    Copper = table.Column<double>(nullable: true),
                    Potassium = table.Column<double>(nullable: true),
                    Selenium = table.Column<double>(nullable: true),
                    Sodium = table.Column<double>(nullable: true),
                    Calcium = table.Column<double>(nullable: true),
                    Iron = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingredients_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "UsersAllergens",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    AllergenId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersAllergens", x => new { x.UserId, x.AllergenId });
                    table.ForeignKey(
                        name: "FK_UsersAllergens_Allergens_AllergenId",
                        column: x => x.AllergenId,
                        principalTable: "Allergens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersAllergens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersParameters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Weight = table.Column<double>(nullable: true),
                    AbdominalCircumference = table.Column<double>(nullable: true),
                    BicepsCircumference = table.Column<double>(nullable: true),
                    ThighCircumference = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersParameters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersParameters_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersSearchPreferences",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    SearchPreferenceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersSearchPreferences", x => new { x.UserId, x.SearchPreferenceId });
                    table.ForeignKey(
                        name: "FK_UsersSearchPreferences_SearchPreferences_SearchPreferenceId",
                        column: x => x.SearchPreferenceId,
                        principalTable: "SearchPreferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersSearchPreferences_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DishesIngredients",
                columns: table => new
                {
                    DishId = table.Column<int>(nullable: false),
                    IngredientId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DishesIngredients", x => new { x.DishId, x.IngredientId });
                    table.ForeignKey(
                        name: "FK_DishesIngredients_Dishes_DishId",
                        column: x => x.DishId,
                        principalTable: "Dishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DishesIngredients_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IngredientsAllergens",
                columns: table => new
                {
                    IngredientId = table.Column<int>(nullable: false),
                    AllergenId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientsAllergens", x => new { x.IngredientId, x.AllergenId });
                    table.ForeignKey(
                        name: "FK_IngredientsAllergens_Allergens_AllergenId",
                        column: x => x.AllergenId,
                        principalTable: "Allergens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IngredientsAllergens_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    DishId = table.Column<int>(nullable: true),
                    IngredientsId = table.Column<int>(nullable: true),
                    Quantity = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meals_Dishes_DishId",
                        column: x => x.DishId,
                        principalTable: "Dishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Meals_Ingredients_IngredientsId",
                        column: x => x.IngredientsId,
                        principalTable: "Ingredients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_UserId",
                table: "Dishes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DishesIngredients_IngredientId",
                table: "DishesIngredients",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_UserId",
                table: "Ingredients",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_IngredientsAllergens_AllergenId",
                table: "IngredientsAllergens",
                column: "AllergenId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_DishId",
                table: "Meals",
                column: "DishId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_IngredientsId",
                table: "Meals",
                column: "IngredientsId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersAllergens_AllergenId",
                table: "UsersAllergens",
                column: "AllergenId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersParameters_UserId",
                table: "UsersParameters",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersSearchPreferences_SearchPreferenceId",
                table: "UsersSearchPreferences",
                column: "SearchPreferenceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DishesIngredients");

            migrationBuilder.DropTable(
                name: "IngredientsAllergens");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "UsersAllergens");

            migrationBuilder.DropTable(
                name: "UsersParameters");

            migrationBuilder.DropTable(
                name: "UsersSearchPreferences");

            migrationBuilder.DropTable(
                name: "Dishes");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Allergens");

            migrationBuilder.DropTable(
                name: "SearchPreferences");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
