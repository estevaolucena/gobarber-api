import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    )
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '21212121',
    })
    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('21212121')
  })

  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    )

    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '21212121',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '21212121',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
