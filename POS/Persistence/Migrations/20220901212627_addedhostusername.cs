using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class addedhostusername : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductCost",
                table: "ProductSuppliers",
                newName: "RupeesPrice");

            migrationBuilder.AddColumn<int>(
                name: "RMBCost",
                table: "ProductSuppliers",
                type: "INTEGER",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "HostUsername",
                table: "Meetings",
                type: "TEXT",
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RMBCost",
                table: "ProductSuppliers");

            migrationBuilder.DropColumn(
                name: "HostUsername",
                table: "Meetings");

            migrationBuilder.RenameColumn(
                name: "RupeesPrice",
                table: "ProductSuppliers",
                newName: "ProductCost");
        }
    }
}
