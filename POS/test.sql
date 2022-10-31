CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

BEGIN TRANSACTION;

CREATE TABLE "Products" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Products" PRIMARY KEY,
    "ProductName" TEXT NOT NULL,
    "ProductNumber" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "QtyStock" INTEGER NOT NULL,
    "Brand" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Cost" INTEGER NOT NULL,
    "Vandor" TEXT NOT NULL,
    "WholesalePrice" INTEGER NOT NULL,
    "RetailPrice" INTEGER NOT NULL,
    "Packed" INTEGER NOT NULL,
    "Created" TEXT NOT NULL,
    "Modified" TEXT NOT NULL
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220110172002_InitialCreate', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "AspNetRoles" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_AspNetRoles" PRIMARY KEY,
    "Name" TEXT NULL,
    "NormalizedName" TEXT NULL,
    "ConcurrencyStamp" TEXT NULL
);

CREATE TABLE "AspNetUsers" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_AspNetUsers" PRIMARY KEY,
    "DisplayName" TEXT NOT NULL,
    "Bio" TEXT NULL,
    "UserName" TEXT NULL,
    "NormalizedUserName" TEXT NULL,
    "Email" TEXT NULL,
    "NormalizedEmail" TEXT NULL,
    "EmailConfirmed" INTEGER NOT NULL,
    "PasswordHash" TEXT NULL,
    "SecurityStamp" TEXT NULL,
    "ConcurrencyStamp" TEXT NULL,
    "PhoneNumber" TEXT NULL,
    "PhoneNumberConfirmed" INTEGER NULL,
    "TwoFactorEnabled" INTEGER NULL,
    "LockoutEnd" TEXT NULL,
    "LockoutEnabled" INTEGER NULL,
    "AccessFailedCount" INTEGER NULL
);

CREATE TABLE "AspNetRoleClaims" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY AUTOINCREMENT,
    "RoleId" TEXT NOT NULL,
    "ClaimType" TEXT NULL,
    "ClaimValue" TEXT NULL,
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserClaims" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY AUTOINCREMENT,
    "UserId" TEXT NOT NULL,
    "ClaimType" TEXT NULL,
    "ClaimValue" TEXT NULL,
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" TEXT NOT NULL,
    "ProviderKey" TEXT NOT NULL,
    "ProviderDisplayName" TEXT NULL,
    "UserId" TEXT NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserRoles" (
    "UserId" TEXT NOT NULL,
    "RoleId" TEXT NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserTokens" (
    "UserId" TEXT NOT NULL,
    "LoginProvider" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Value" TEXT NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" ("RoleId");

CREATE UNIQUE INDEX "RoleNameIndex" ON "AspNetRoles" ("NormalizedName");

CREATE INDEX "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" ("UserId");

CREATE INDEX "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" ("UserId");

CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" ("RoleId");

CREATE INDEX "EmailIndex" ON "AspNetUsers" ("NormalizedEmail");

CREATE UNIQUE INDEX "UserNameIndex" ON "AspNetUsers" ("NormalizedUserName");

CREATE TABLE "ef_temp_Products" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Products" PRIMARY KEY,
    "Brand" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Cost" REAL NOT NULL,
    "Created" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Modified" TEXT NOT NULL,
    "Packed" INTEGER NOT NULL,
    "ProductName" TEXT NOT NULL,
    "ProductNumber" TEXT NOT NULL,
    "QtyStock" INTEGER NOT NULL,
    "RetailPrice" REAL NOT NULL,
    "Vandor" TEXT NOT NULL,
    "WholesalePrice" REAL NOT NULL
);

INSERT INTO "ef_temp_Products" ("Id", "Brand", "Category", "Cost", "Created", "Description", "Modified", "Packed", "ProductName", "ProductNumber", "QtyStock", "RetailPrice", "Vandor", "WholesalePrice")
SELECT "Id", "Brand", "Category", "Cost", "Created", "Description", "Modified", "Packed", "ProductName", "ProductNumber", "QtyStock", "RetailPrice", "Vandor", "WholesalePrice"
FROM "Products";

COMMIT;

PRAGMA foreign_keys = 0;

BEGIN TRANSACTION;

DROP TABLE "Products";

ALTER TABLE "ef_temp_Products" RENAME TO "Products";

COMMIT;

PRAGMA foreign_keys = 1;

BEGIN TRANSACTION;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220802081454_secondMigration', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Suppliers" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Suppliers" PRIMARY KEY,
    "SupplierName" TEXT NOT NULL,
    "SupplierAddress" TEXT NOT NULL,
    "SupplierContact" TEXT NOT NULL,
    "Description" TEXT NOT NULL
);

CREATE TABLE "ProductSuppliers" (
    "ProductId" TEXT NOT NULL,
    "SupplierId" TEXT NOT NULL,
    "ProductCost" INTEGER NOT NULL,
    CONSTRAINT "PK_ProductSuppliers" PRIMARY KEY ("SupplierId", "ProductId"),
    CONSTRAINT "FK_ProductSuppliers_Products_SupplierId" FOREIGN KEY ("SupplierId") REFERENCES "Products" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProductSuppliers_Suppliers_ProductId" FOREIGN KEY ("ProductId") REFERENCES "Suppliers" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ProductSuppliers_ProductId" ON "ProductSuppliers" ("ProductId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220812182127_ProductSupplierAdds', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Meetings" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Meetings" PRIMARY KEY,
    "Agenda" TEXT NOT NULL,
    "MeetingDate" TEXT NOT NULL
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220813172431_addedMeetingEntity', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "UserMeetings" (
    "AppUserId" TEXT NOT NULL,
    "MeetingId" TEXT NOT NULL,
    "MeetingDate" TEXT NOT NULL,
    "IsCovener" INTEGER NOT NULL,
    CONSTRAINT "PK_UserMeetings" PRIMARY KEY ("AppUserId", "MeetingId"),
    CONSTRAINT "FK_UserMeetings_AspNetUsers_AppUserId" FOREIGN KEY ("AppUserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_UserMeetings_Meetings_MeetingId" FOREIGN KEY ("MeetingId") REFERENCES "Meetings" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_UserMeetings_MeetingId" ON "UserMeetings" ("MeetingId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220814172947_configuredAppUserMeeting', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

ALTER TABLE "Meetings" ADD "IsCancelled" INTEGER NOT NULL DEFAULT 0;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220820202703_addedcancelledmeeting', '6.0.7');

COMMIT;

BEGIN TRANSACTION;



ALTER TABLE "ProductSuppliers" ADD "RMBCost" INTEGER NULL DEFAULT 0;

ALTER TABLE "Meetings" ADD "HostUsername" TEXT NULL DEFAULT '';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220901212627_addedhostusername', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "ef_temp_ProductSuppliers" (
    "SupplierId" TEXT NOT NULL,
    "ProductId" TEXT NOT NULL,
    "RMBCost" INTEGER NOT NULL,
    "RupeesPrice" INTEGER NOT NULL,
    CONSTRAINT "PK_ProductSuppliers" PRIMARY KEY ("SupplierId", "ProductId"),
    CONSTRAINT "FK_ProductSuppliers_Products_ProductId" FOREIGN KEY ("ProductId") REFERENCES "Products" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProductSuppliers_Suppliers_SupplierId" FOREIGN KEY ("SupplierId") REFERENCES "Suppliers" ("Id") ON DELETE CASCADE
);

INSERT INTO "ef_temp_ProductSuppliers" ("SupplierId", "ProductId", "RMBCost", "RupeesPrice")
SELECT "SupplierId", "ProductId", "RMBCost", "RupeesPrice"
FROM "ProductSuppliers";

COMMIT;

PRAGMA foreign_keys = 0;

BEGIN TRANSACTION;

DROP TABLE "ProductSuppliers";

ALTER TABLE "ef_temp_ProductSuppliers" RENAME TO "ProductSuppliers";

COMMIT;

PRAGMA foreign_keys = 1;

BEGIN TRANSACTION;

CREATE INDEX "IX_ProductSuppliers_ProductId" ON "ProductSuppliers" ("ProductId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220912195220_changedPKs', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Photo" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Photo" PRIMARY KEY,
    "Url" TEXT NOT NULL,
    "IsMain" INTEGER NOT NULL,
    "AppUserId" TEXT NULL,
    CONSTRAINT "FK_Photo_AspNetUsers_AppUserId" FOREIGN KEY ("AppUserId") REFERENCES "AspNetUsers" ("Id")
);

CREATE INDEX "IX_Photo_AppUserId" ON "Photo" ("AppUserId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220916074159_PhotoEntityAdded', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

ALTER TABLE "Photo" RENAME TO "Photos";

DROP INDEX "IX_Photo_AppUserId";

CREATE INDEX "IX_Photos_AppUserId" ON "Photos" ("AppUserId");

CREATE TABLE "Customers" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Customers" PRIMARY KEY,
    "CustomerName" TEXT NOT NULL,
    "CustomerAddress" TEXT NOT NULL
);

CREATE TABLE "Orders" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Orders" PRIMARY KEY,
    "OrderDate" TEXT NOT NULL,
    "OrderAmount" INTEGER NOT NULL,
    "Comments" TEXT NOT NULL,
    "CustomerId" TEXT NULL,
    CONSTRAINT "FK_Orders_Customers_CustomerId" FOREIGN KEY ("CustomerId") REFERENCES "Customers" ("Id")
);

CREATE TABLE "OrderDetails" (
    "ProductId" TEXT NOT NULL,
    "OrderId" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    CONSTRAINT "PK_OrderDetails" PRIMARY KEY ("OrderId", "ProductId"),
    CONSTRAINT "FK_OrderDetails_Orders_OrderId" FOREIGN KEY ("OrderId") REFERENCES "Orders" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_OrderDetails_Products_ProductId" FOREIGN KEY ("ProductId") REFERENCES "Products" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_OrderDetails_ProductId" ON "OrderDetails" ("ProductId");

CREATE INDEX "IX_Orders_CustomerId" ON "Orders" ("CustomerId");

CREATE TABLE "ef_temp_Photos" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Photos" PRIMARY KEY,
    "AppUserId" TEXT NULL,
    "IsMain" INTEGER NOT NULL,
    "Url" TEXT NOT NULL,
    CONSTRAINT "FK_Photos_AspNetUsers_AppUserId" FOREIGN KEY ("AppUserId") REFERENCES "AspNetUsers" ("Id")
);

INSERT INTO "ef_temp_Photos" ("Id", "AppUserId", "IsMain", "Url")
SELECT "Id", "AppUserId", "IsMain", "Url"
FROM "Photos";

COMMIT;

PRAGMA foreign_keys = 0;

BEGIN TRANSACTION;

DROP TABLE "Photos";

ALTER TABLE "ef_temp_Photos" RENAME TO "Photos";

COMMIT;

PRAGMA foreign_keys = 1;

BEGIN TRANSACTION;

CREATE INDEX "IX_Photos_AppUserId" ON "Photos" ("AppUserId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220916181431_addedOrderDetails', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Comments" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Comments" PRIMARY KEY AUTOINCREMENT,
    "Body" TEXT NOT NULL,
    "AuthorId" TEXT NULL,
    "MeetingId" TEXT NOT NULL,
    "CreatedAt" TEXT NOT NULL,
    CONSTRAINT "FK_Comments_AspNetUsers_AuthorId" FOREIGN KEY ("AuthorId") REFERENCES "AspNetUsers" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Comments_Meetings_MeetingId" FOREIGN KEY ("MeetingId") REFERENCES "Meetings" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Comments_AuthorId" ON "Comments" ("AuthorId");

CREATE INDEX "IX_Comments_MeetingId" ON "Comments" ("MeetingId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220929190834_commentEntityAdded', '6.0.7');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "UserFollowings" (
    "ObserverId" TEXT NOT NULL,
    "TargetId" TEXT NOT NULL,
    CONSTRAINT "PK_UserFollowings" PRIMARY KEY ("ObserverId", "TargetId"),
    CONSTRAINT "FK_UserFollowings_AspNetUsers_ObserverId" FOREIGN KEY ("ObserverId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_UserFollowings_AspNetUsers_TargetId" FOREIGN KEY ("TargetId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_UserFollowings_TargetId" ON "UserFollowings" ("TargetId");

CREATE TABLE "ef_temp_Meetings" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Meetings" PRIMARY KEY,
    "Agenda" TEXT NULL,
    "HostUsername" TEXT NULL,
    "IsCancelled" INTEGER NOT NULL,
    "MeetingDate" TEXT NOT NULL
);

INSERT INTO "ef_temp_Meetings" ("Id", "Agenda", "HostUsername", "IsCancelled", "MeetingDate")
SELECT "Id", "Agenda", "HostUsername", "IsCancelled", "MeetingDate"
FROM "Meetings";

COMMIT;

PRAGMA foreign_keys = 0;

BEGIN TRANSACTION;

DROP TABLE "Meetings";

ALTER TABLE "ef_temp_Meetings" RENAME TO "Meetings";

COMMIT;

PRAGMA foreign_keys = 1;

BEGIN TRANSACTION;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20221018130806_FollowingEntityAdded', '6.0.7');

COMMIT;

