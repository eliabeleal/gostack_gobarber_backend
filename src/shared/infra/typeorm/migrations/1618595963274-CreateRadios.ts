import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRadios1618595963274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'radios',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'alias',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'serial',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'type',
            type: 'integer',
          },
          {
            name: 'unit_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UnitRadio',
            referencedTableName: 'units',
            referencedColumnNames: ['id'],
            columnNames: ['unit_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('radios');
  }
}
