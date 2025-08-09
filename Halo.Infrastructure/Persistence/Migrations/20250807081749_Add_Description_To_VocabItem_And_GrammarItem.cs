using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Halo.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Add_Description_To_VocabItem_And_GrammarItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "public",
                table: "vocab_items",
                type: "character varying(5000)",
                maxLength: 5000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "public",
                table: "grammar_items",
                type: "character varying(5000)",
                maxLength: 5000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                schema: "public",
                table: "vocab_items");

            migrationBuilder.DropColumn(
                name: "Description",
                schema: "public",
                table: "grammar_items");
        }
    }
}
