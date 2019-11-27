using Microsoft.EntityFrameworkCore.Migrations;

namespace BeeFit.API.Migrations
{
    public partial class RevertedLastChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Targets_Users_UserId",
                table: "Targets");

            migrationBuilder.DropIndex(
                name: "IX_Targets_UserId",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Targets");

            migrationBuilder.AddColumn<int>(
                name: "TargetId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_TargetId",
                table: "Users",
                column: "TargetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Targets_TargetId",
                table: "Users",
                column: "TargetId",
                principalTable: "Targets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Targets_TargetId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_TargetId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TargetId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Targets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Targets_UserId",
                table: "Targets",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Targets_Users_UserId",
                table: "Targets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
