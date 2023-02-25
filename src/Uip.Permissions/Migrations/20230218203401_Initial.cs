using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Uip.Permissions.Interfaces;

#nullable disable

namespace Uip.Permissions.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActionPolicyDocuments",
                columns: table =>
                    new
                    {
                        Id = table.Column<Guid>(type: "uuid", nullable: false),
                        Name = table.Column<string>(type: "text", nullable: false),
                        Description = table.Column<string>(type: "text", nullable: false),
                        Statements = table.Column<IList<ActionPolicyStatementDto>>(
                            type: "jsonb",
                            nullable: false
                        ),
                        RowVersion = table.Column<byte[]>(
                            type: "bytea",
                            rowVersion: true,
                            nullable: true
                        )
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionPolicyDocuments", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table =>
                    new
                    {
                        Id = table.Column<Guid>(type: "uuid", nullable: false),
                        Name = table.Column<string>(type: "text", nullable: false),
                        Description = table.Column<string>(type: "text", nullable: false),
                        RowVersion = table.Column<byte[]>(
                            type: "bytea",
                            rowVersion: true,
                            nullable: true
                        )
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "RoleActionPolicyDocuments",
                columns: table =>
                    new
                    {
                        RoleId = table.Column<Guid>(type: "uuid", nullable: false),
                        ActionPolicyDocumentId = table.Column<Guid>(type: "uuid", nullable: false)
                    },
                constraints: table =>
                {
                    table.PrimaryKey(
                        "PK_RoleActionPolicyDocuments",
                        x => new { x.RoleId, x.ActionPolicyDocumentId }
                    );
                    table.ForeignKey(
                        name: "FK_RoleActionPolicyDocuments_ActionPolicyDocuments_ActionPolic~",
                        column: x => x.ActionPolicyDocumentId,
                        principalTable: "ActionPolicyDocuments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                    table.ForeignKey(
                        name: "FK_RoleActionPolicyDocuments_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table =>
                    new
                    {
                        UserId = table.Column<string>(type: "text", nullable: false),
                        RoleId = table.Column<Guid>(type: "uuid", nullable: false)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_ActionPolicyDocuments_Name",
                table: "ActionPolicyDocuments",
                column: "Name",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_RoleActionPolicyDocuments_ActionPolicyDocumentId",
                table: "RoleActionPolicyDocuments",
                column: "ActionPolicyDocumentId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Roles_Name",
                table: "Roles",
                column: "Name",
                unique: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "RoleActionPolicyDocuments");

            migrationBuilder.DropTable(name: "UserRoles");

            migrationBuilder.DropTable(name: "ActionPolicyDocuments");

            migrationBuilder.DropTable(name: "Roles");
        }
    }
}
