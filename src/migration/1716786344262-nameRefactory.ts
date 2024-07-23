import { MigrationInterface, QueryRunner } from "typeorm";

export class NameRefactory1716786344262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "name"`);
    }

}
