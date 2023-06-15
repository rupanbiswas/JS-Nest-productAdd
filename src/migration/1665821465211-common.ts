import { MigrationInterface, QueryRunner } from "typeorm";

export class common1665821465211 implements MigrationInterface {
    name = 'common1665821465211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ads\` (\`id\` int NOT NULL AUTO_INCREMENT, \`shopify_product_id\` bigint NOT NULL, \`text\` varchar(255) NOT NULL, \`is_saved\` tinyint NOT NULL DEFAULT 0, \`is_disliked\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shopify_store_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`store_has_purchases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number_of_products\` int NOT NULL, \`price\` double NOT NULL, \`subscription_name\` varchar(255) NOT NULL, \`shopify_charge_id\` bigint NOT NULL, \`shopify_charge_url\` varchar(255) NOT NULL, \`shopify_charge_status\` varchar(255) NOT NULL DEFAULT 'pending', \`shopify_charge_response\` json NOT NULL, \`days\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shopify_store_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stores\` (\`shopify_store_id\` bigint NOT NULL, \`store_name\` varchar(255) NOT NULL, \`store_domain\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`store_access_token\` varchar(255) NOT NULL, \`total_allowed_products\` int NOT NULL DEFAULT '0', \`total_subscribed_products\` int NOT NULL DEFAULT '0', \`total_saved_ads\` int NOT NULL DEFAULT '0', \`total_disliked_ads\` int NOT NULL DEFAULT '0', \`subscription_start_date\` varchar(255) NULL, \`subscription_end_date\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`shopify_store_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subscribed_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`shopify_product_id\` bigint NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`price\` int NOT NULL DEFAULT '0', \`image\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shopify_store_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ads\` ADD CONSTRAINT \`FK_df1fe12fd7c46fd3b53d6af98e2\` FOREIGN KEY (\`shopify_store_id\`) REFERENCES \`stores\`(\`shopify_store_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store_has_purchases\` ADD CONSTRAINT \`FK_c2f33341bfcfec4defcd8f12863\` FOREIGN KEY (\`shopify_store_id\`) REFERENCES \`stores\`(\`shopify_store_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subscribed_products\` ADD CONSTRAINT \`FK_101b4389ac306b83122616ce868\` FOREIGN KEY (\`shopify_store_id\`) REFERENCES \`stores\`(\`shopify_store_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscribed_products\` DROP FOREIGN KEY \`FK_101b4389ac306b83122616ce868\``);
        await queryRunner.query(`ALTER TABLE \`store_has_purchases\` DROP FOREIGN KEY \`FK_c2f33341bfcfec4defcd8f12863\``);
        await queryRunner.query(`ALTER TABLE \`ads\` DROP FOREIGN KEY \`FK_df1fe12fd7c46fd3b53d6af98e2\``);
        await queryRunner.query(`DROP TABLE \`subscribed_products\``);
        await queryRunner.query(`DROP TABLE \`stores\``);
        await queryRunner.query(`DROP TABLE \`store_has_purchases\``);
        await queryRunner.query(`DROP TABLE \`ads\``);
    }

}
