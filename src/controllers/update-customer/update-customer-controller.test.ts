import { MongoHelper } from '../../infra/db/mongo-helper'
import { makeApp } from '../../main/factory'
import request from 'supertest'
const app = makeApp().express

describe('UpdateCustomerController', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const session: request.SuperAgentTest = request.agent(app)
  test('Should return bad request', async () => {
    await session
      .put('/customer/i')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBeFalsy()
        expect(res.body.message).toBe('invalid customer id')
        expect(res.body.status).toBe('INVALID_DATA')
      })
  })

  test('Should return customer not found', async () => {
    await session
      .put('/customer/507f1f77bcf86cd799439011')
      .send({
        name: 'any_name',
        birthDate: new Date(),
        CPF: 'any_cpf',
        RG: 'any_rg'
      })
      .expect(404)
      .then((res) => {
        expect(res.body.success).toBeFalsy()
        expect(res.body.message).toBe('customer not found')
        expect(res.body.status).toBe('NOT_FOUND')
      })
  })

  test('Should create a new customer', async () => {
    await session
      .post('/customer')
      .send({
        name: 'any_name',
        birthDate: new Date(),
        CPF: 'any_cpf',
        RG: 'any_rg'
      })
      .expect(201)
      .then(async (res) => {
        const idCustomer = res.body.data.id as string
        await session
          .put(`/customer/${idCustomer}`)
          .send({
            name: 'any_name',
            birthDate: new Date(),
            CPF: 'any_cpf',
            RG: 'any_rg'
          })
          .expect(201)
          .then((res) => {
            expect(res.body.success).toBeTruthy()
            expect(res.body.data.name).toBe('any_name')
            expect(res.body.message).toBe('customer updated successfully')
            expect(res.body.status).toBe('SUCCESS')
          })
      })
  })
})
