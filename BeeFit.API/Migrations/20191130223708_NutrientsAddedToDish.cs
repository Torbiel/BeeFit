using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class NutrientsAddedToDish : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Callories",
                table: "Dishes",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Carbohydrates",
                table: "Dishes",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Fats",
                table: "Dishes",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Proteins",
                table: "Dishes",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Callories",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "Carbohydrates",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "Proteins",
                table: "Dishes");
        }
    }
}
