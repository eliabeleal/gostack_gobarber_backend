import AppError from '@shared/errors/AppError';

import FakeUnitsRepository from '../repositories/fakes/FakeUnitsRepository';
import CreateUnitService from './CreateUnitService';

let fakeUnitsRepository: FakeUnitsRepository;
let createUnit: CreateUnitService;

describe('CreateRadio', () => {
  beforeEach(() => {
    fakeUnitsRepository = new FakeUnitsRepository();

    createUnit = new CreateUnitService(fakeUnitsRepository);
  });
  it('should be able to create a new unit', async () => {
    const unit = await createUnit.execute({
      name: '1º Batalhão de Polícia Militar',
      address: {
        street: 'Av. Beaurepaire Rohan',
        neighborhood: 'Varadouro',
        city: 'João Pessoa - PB',
        postcode: '58010-020',
        country: 'Brasil',
      },
    });

    expect(unit).toHaveProperty('id');
  });

  it('should be not able to create a new radio with same id from another', async () => {
    await createUnit.execute({
      name: '1º Batalhão de Polícia Militar',
      address: {
        street: 'Av. Beaurepaire Rohan',
        neighborhood: 'Varadouro',
        city: 'João Pessoa - PB',
        postcode: '58010-020',
        country: 'Brasil',
      },
    });

    await expect(
      createUnit.execute({
        name: '1º Batalhão de Polícia Militar',
        address: {
          street: 'Av. Beaurepaire Rohan',
          neighborhood: 'Varadouro',
          city: 'João Pessoa - PB',
          postcode: '58010020',
          country: 'Brasil',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
