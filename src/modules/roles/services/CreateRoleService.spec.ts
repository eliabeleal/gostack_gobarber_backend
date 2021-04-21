import AppError from '@shared/errors/AppError';

import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import CreateRoleService from './CreateRoleService';

let fakeRolesRepository: FakeRolesRepository;
let createRole: CreateRoleService;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    createRole = new CreateRoleService(fakeRolesRepository);
  });
  it('should be able to create a new role', async () => {
    const role = await createRole.execute({
      name: 'Gestores 1BPM',
      descripton:
        'Gestor do primeiro batalhão da polícia, pode visualizar todas as VTRs daquele batalhão',
      start: new Date('2021-3-1'),
      end: new Date('2021-4-22'),
      status: true,
      units: [{ name:  }],
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create a new role with same name from another role', async () => {
    await createRole.execute({
      name: 'Gestores 1BPM',
      descripton:
        'Gestor do primeiro batalhão da polícia, pode visualizar todas as VTRs daquele batalhão',
      start: new Date('2021-3-1'),
      end: new Date('2021-4-22'),
      status: true,
      units: ['unit_1', 'unit_2', 'unit_3'],
    });

    await expect(
      createRole.execute({
        name: 'Gestores 1BPM',
        descripton:
          'Gestor do primeiro batalhão da polícia, pode visualizar todas as VTRs daquele batalhão',
        start: new Date('2021-3-1'),
        end: new Date('2021-4-22'),
        status: true,
        units: ['unit_1', 'unit_2', 'unit_3'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new role with start period on a future date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 21).getTime();
    });
    await expect(
      createRole.execute({
        name: 'Gestores 1BPM',
        descripton:
          'Gestor do primeiro batalhão da polícia, pode visualizar todas as VTRs daquele batalhão',
        start: new Date('2021-4-22'),
        end: new Date('2021-4-22'),
        status: true,
        units: ['unit_1', 'unit_2', 'unit_3'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new role with end period on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 5, 21).getTime();
    });
    await expect(
      createRole.execute({
        name: 'Gestores 1BPM',
        descripton:
          'Gestor do primeiro batalhão da polícia, pode visualizar todas as VTRs daquele batalhão',
        start: new Date('2021-4-21'),
        end: new Date('2021-4-20'),
        status: true,
        units: ['unit_1', 'unit_2', 'unit_3'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
