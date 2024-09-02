using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gdje_cemo_vani.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TownParts",
                columns: table => new
                {
                    TownPartId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TownParts", x => x.TownPartId);
                });

            migrationBuilder.CreateTable(
                name: "HangoutSpots",
                columns: table => new
                {
                    HangoutSpotId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TownPartId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HangoutSpots", x => x.HangoutSpotId);
                    table.ForeignKey(
                        name: "FK_HangoutSpots_TownParts_TownPartId",
                        column: x => x.TownPartId,
                        principalTable: "TownParts",
                        principalColumn: "TownPartId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HangoutSpots_TownPartId",
                table: "HangoutSpots",
                column: "TownPartId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HangoutSpots");

            migrationBuilder.DropTable(
                name: "TownParts");
        }
    }
}
