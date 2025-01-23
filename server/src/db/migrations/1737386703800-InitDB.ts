import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1737386703800 implements MigrationInterface {
  name = "InitDB1737386703800";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "supplierId" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "created_at" date NOT NULL, "statusId" integer, "supplierId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "postcode" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "delay" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "commentary" character varying, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "product" character varying NOT NULL, "material" character varying, "color" character varying, "commentary" character varying, "category" character varying NOT NULL, "image" character varying, "description" character varying NOT NULL, "stock" integer NOT NULL, "min_quantity" integer NOT NULL DEFAULT '10', "active" boolean NOT NULL DEFAULT true, "supplierId" integer, "employeeId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fd8b82470959145fdf427784046" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "created_at" date NOT NULL DEFAULT now(), "statusId" integer, "userId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "activationDate" date NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "roleId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_295cc6eacc44e3470e3c6911550" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc" FOREIGN KEY ("statusId") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_af5c3fc71f410fb94a613f6b66e" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_c72519111a22951e993f7ecfb27" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_6dd91fb6881f26184cb49e7d655" FOREIGN KEY ("statusId") REFERENCES "message_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_6dd91fb6881f26184cb49e7d655"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_c72519111a22951e993f7ecfb27"`
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_af5c3fc71f410fb94a613f6b66e"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_295cc6eacc44e3470e3c6911550"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "message_status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "supplier"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order_status"`);
    await queryRunner.query(`DROP TABLE "order_product"`);
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
