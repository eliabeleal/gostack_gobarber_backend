import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepositoy from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepositoy;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepositoy();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234561234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234561234');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234561234',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1234561234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
