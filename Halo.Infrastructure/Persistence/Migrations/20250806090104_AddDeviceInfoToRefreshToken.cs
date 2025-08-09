using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Halo.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddDeviceInfoToRefreshToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_refresh_tokens_study_days_StudyDayId",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropIndex(
                name: "IX_refresh_tokens_StudyDayId",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropColumn(
                name: "StudyDayId",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropColumn(
                name: "TargetDate",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                schema: "public",
                table: "refresh_tokens",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "device_info",
                schema: "public",
                table: "refresh_tokens",
                type: "character varying(512)",
                maxLength: 512,
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "device_info",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.AddColumn<int>(
                name: "StudyDayId",
                schema: "public",
                table: "refresh_tokens",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "TargetDate",
                schema: "public",
                table: "refresh_tokens",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_refresh_tokens_StudyDayId",
                schema: "public",
                table: "refresh_tokens",
                column: "StudyDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_refresh_tokens_study_days_StudyDayId",
                schema: "public",
                table: "refresh_tokens",
                column: "StudyDayId",
                principalSchema: "public",
                principalTable: "study_days",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
