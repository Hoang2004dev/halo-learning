using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Halo.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "study_days",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TargetDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Note = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_study_days", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "grammar_items",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Topic = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Explanation = table.Column<string>(type: "text", nullable: false),
                    Exercise = table.Column<string>(type: "text", nullable: true),
                    Answer = table.Column<string>(type: "text", nullable: true),
                    StudyDayId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grammar_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_grammar_items_study_days_StudyDayId",
                        column: x => x.StudyDayId,
                        principalSchema: "public",
                        principalTable: "study_days",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "listening_items",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    AudioUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Transcript = table.Column<string>(type: "text", nullable: true),
                    FillInContent = table.Column<string>(type: "text", nullable: true),
                    Score = table.Column<float>(type: "real", precision: 5, scale: 2, nullable: true),
                    StudyDayId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_listening_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_listening_items_study_days_StudyDayId",
                        column: x => x.StudyDayId,
                        principalSchema: "public",
                        principalTable: "study_days",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "speaking_items",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Prompt = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AudioUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    TranscriptByAI = table.Column<string>(type: "text", nullable: true),
                    Feedback = table.Column<string>(type: "text", nullable: true),
                    StudyDayId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speaking_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_speaking_items_study_days_StudyDayId",
                        column: x => x.StudyDayId,
                        principalSchema: "public",
                        principalTable: "study_days",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vocab_items",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Word = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    NativeMeaning = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    ForeignMeaning = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Example = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    AudioUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    StudyDayId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vocab_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_vocab_items_study_days_StudyDayId",
                        column: x => x.StudyDayId,
                        principalSchema: "public",
                        principalTable: "study_days",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "writing_items",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Prompt = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    Suggestion = table.Column<string>(type: "text", nullable: true),
                    Feedback = table.Column<string>(type: "text", nullable: true),
                    StudyDayId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_writing_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_writing_items_study_days_StudyDayId",
                        column: x => x.StudyDayId,
                        principalSchema: "public",
                        principalTable: "study_days",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_grammar_items_StudyDayId",
                schema: "public",
                table: "grammar_items",
                column: "StudyDayId");

            migrationBuilder.CreateIndex(
                name: "IX_listening_items_StudyDayId",
                schema: "public",
                table: "listening_items",
                column: "StudyDayId");

            migrationBuilder.CreateIndex(
                name: "IX_speaking_items_StudyDayId",
                schema: "public",
                table: "speaking_items",
                column: "StudyDayId");

            migrationBuilder.CreateIndex(
                name: "IX_vocab_items_StudyDayId",
                schema: "public",
                table: "vocab_items",
                column: "StudyDayId");

            migrationBuilder.CreateIndex(
                name: "IX_writing_items_StudyDayId",
                schema: "public",
                table: "writing_items",
                column: "StudyDayId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "grammar_items",
                schema: "public");

            migrationBuilder.DropTable(
                name: "listening_items",
                schema: "public");

            migrationBuilder.DropTable(
                name: "speaking_items",
                schema: "public");

            migrationBuilder.DropTable(
                name: "vocab_items",
                schema: "public");

            migrationBuilder.DropTable(
                name: "writing_items",
                schema: "public");

            migrationBuilder.DropTable(
                name: "study_days",
                schema: "public");
        }
    }
}
