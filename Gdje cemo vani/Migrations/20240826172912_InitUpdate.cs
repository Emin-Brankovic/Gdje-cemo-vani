using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gdje_cemo_vani.Migrations
{
    /// <inheritdoc />
    public partial class InitUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "HangoutSpots");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "HangoutSpots",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HangoutSpots_CategoryId",
                table: "HangoutSpots",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_HangoutSpots_Categories_CategoryId",
                table: "HangoutSpots",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HangoutSpots_Categories_CategoryId",
                table: "HangoutSpots");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_HangoutSpots_CategoryId",
                table: "HangoutSpots");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "HangoutSpots");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "HangoutSpots",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
