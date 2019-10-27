using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class IngredientChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.AlterColumn<double>(
                name: "Sugars",
                table: "Ingredients",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Carbohydrates",
                table: "Ingredients",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Fats",
                table: "Ingredients",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Proteins",
                table: "Ingredients",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fats",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "Proteins",
                table: "Ingredients");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<double>(
                name: "Sugars",
                table: "Ingredients",
                type: "float",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<double>(
                name: "Carbohydrates",
                table: "Ingredients",
                type: "float",
                nullable: true,
                oldClrType: typeof(double));
        }
    }
}
