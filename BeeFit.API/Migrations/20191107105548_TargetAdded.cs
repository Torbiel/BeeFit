using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class TargetAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TargetId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Target",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EstimatedEnd = table.Column<DateTime>(nullable: false),
                    WeightFrom = table.Column<float>(nullable: false),
                    WeightTo = table.Column<float>(nullable: false),
                    ChangePerWeek = table.Column<float>(nullable: false),
                    DayActivity = table.Column<int>(nullable: false),
                    TrainingActivity = table.Column<int>(nullable: false),
                    Callories = table.Column<float>(nullable: false),
                    Proteins = table.Column<float>(nullable: false),
                    Fats = table.Column<float>(nullable: false),
                    Carbohydrates = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Target", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_TargetId",
                table: "Users",
                column: "TargetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Target_TargetId",
                table: "Users",
                column: "TargetId",
                principalTable: "Target",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Target_TargetId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Target");

            migrationBuilder.DropIndex(
                name: "IX_Users_TargetId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TargetId",
                table: "Users");
        }
    }
}
