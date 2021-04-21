import AppError from '@shared/errors/AppError';

import FakeRadiosRepository from '../repositories/fakes/FakeRadiosRepository';
import CreateRadioService from './CreateRadioService';

let fakeRadiosRepository: FakeRadiosRepository;
let createRadio: CreateRadioService;

describe('CreateRadio', () => {
  beforeEach(() => {
    fakeRadiosRepository = new FakeRadiosRepository();

    createRadio = new CreateRadioService(fakeRadiosRepository);
  });
  it('should be able to create a new radio', async () => {
    const radio = await createRadio.execute({
      id: '1029295',
      alias: 'Radio Eliabe GTI',
      serial: '893TSVA169',
      type: 'portable',
      unit_id: 'unit_id',
    });

    expect(radio).toHaveProperty('id');
  });

  it('should be not able to create a new radio with same id from another', async () => {
    await createRadio.execute({
      id: '1029295',
      alias: 'Radio Eliabe GTI',
      serial: '893TSVA169',
      type: 'portable',
      unit_id: 'unit_id',
    });

    await expect(
      createRadio.execute({
        id: '1029295',
        alias: 'Radio Eliabe GTI',
        serial: '893TSVA169',
        type: 'portable',
        unit_id: 'unit_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
