import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFinances1636684352575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'finances',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'natureza',
            type: 'varchar',
          },
          {
            name: 'valor',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'parcelas',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('finances');
  }
}
