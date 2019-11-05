using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class AllergensChangedToPreferences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Ingredients_IngredientsId",
                table: "Meals");

            migrationBuilder.DropTable(
                name: "IngredientsAllergens");

            migrationBuilder.DropTable(
                name: "UsersAllergens");

            migrationBuilder.DropTable(
                name: "Allergens");

            migrationBuilder.DropIndex(
                name: "IX_Meals_IngredientsId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "SearchPreferences");

            migrationBuilder.DropColumn(
                name: "IngredientsId",
                table: "Meals");

            migrationBuilder.AddColumn<int>(
                name: "PreferenceType",
                table: "SearchPreferences",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IngredientId",
                table: "Meals",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Meals",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IngredientsSearchPreferences",
                columns: table => new
                {
                    IngredientId = table.Column<int>(nullable: false),
                    SearchPreferenceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientsSearchPreferences", x => new { x.IngredientId, x.SearchPreferenceId });
                    table.ForeignKey(
                        name: "FK_IngredientsSearchPreferences_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IngredientsSearchPreferences_SearchPreferences_SearchPreferenceId",
                        column: x => x.SearchPreferenceId,
                        principalTable: "SearchPreferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meals_IngredientId",
                table: "Meals",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_UserId",
                table: "Meals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_IngredientsSearchPreferences_SearchPreferenceId",
                table: "IngredientsSearchPreferences",
                column: "SearchPreferenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Ingredients_IngredientId",
                table: "Meals",
                column: "IngredientId",
                principalTable: "Ingredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Users_UserId",
                table: "Meals",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Ingredients_IngredientId",
                table: "Meals");

            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Users_UserId",
                table: "Meals");

            migrationBuilder.DropTable(
                name: "IngredientsSearchPreferences");

            migrationBuilder.DropIndex(
                name: "IX_Meals_IngredientId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_UserId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "PreferenceType",
                table: "SearchPreferences");

            migrationBuilder.DropColumn(
                name: "IngredientId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Meals");

            migrationBuilder.AddColumn<double>(
                name: "Quantity",
                table: "SearchPreferences",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IngredientsId",
                table: "Meals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Allergens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Allergens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IngredientsAllergens",
                columns: table => new
                {
                    IngredientId = table.Column<int>(type: "int", nullable: false),
                    AllergenId = table.Column<int>(type: "int", nullable: false)
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
                name: "UsersAllergens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AllergenId = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_Meals_IngredientsId",
                table: "Meals",
                column: "IngredientsId");

            migrationBuilder.CreateIndex(
                name: "IX_IngredientsAllergens_AllergenId",
                table: "IngredientsAllergens",
                column: "AllergenId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersAllergens_AllergenId",
                table: "UsersAllergens",
                column: "AllergenId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Ingredients_IngredientsId",
                table: "Meals",
                column: "IngredientsId",
                principalTable: "Ingredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
