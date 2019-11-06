using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class IngredientsUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Ingredients",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GramsPerUnit",
                table: "Ingredients",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "GramsPerUnit",
                table: "Ingredients");
        }
    }
}
