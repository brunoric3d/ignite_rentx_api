import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1626541401955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "password", type: "varchar" },
          { name: "email", type: "varchar", isUnique: true },
          { name: "driver_license", type: "varchar" },
          { name: "admin", type: "boolean", default: false },
          { name: "avatar", type: "varchar", isNullable: true },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
