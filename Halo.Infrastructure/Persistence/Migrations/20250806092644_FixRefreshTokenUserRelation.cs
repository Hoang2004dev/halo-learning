using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Halo.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixRefreshTokenUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_refresh_tokens_users_UserId1",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropIndex(
                name: "IX_refresh_tokens_UserId1",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropColumn(
                name: "UserId1",
                schema: "public",
                table: "refresh_tokens");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                schema: "public",
                table: "refresh_tokens",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_refresh_tokens_UserId1",
                schema: "public",
                table: "refresh_tokens",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_refresh_tokens_users_UserId1",
                schema: "public",
                table: "refresh_tokens",
                column: "UserId1",
                principalSchema: "public",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
