import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveRadioTypeFromRadios1619029783787
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('radios', 'type');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'radios',
      new TableColumn({
        name: 'type',
        type: 'integer',
      }),
    );
  }
}
