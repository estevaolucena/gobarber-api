import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
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
})
