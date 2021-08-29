import { MongoHelper } from '../../infra/db/mongo-helper'
import { makeApp } from '../../main/factory'
import request from 'supertest'
const app = makeApp().express

describe('CreateCustomerController', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const session: request.SuperAgentTest = request.agent(app)
  test('Should return bad request', async () => {
    await session
      .post('/customer')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBeFalsy()
        expect(res.body.message).toBe('invalid data')
        expect(res.body.status).toBe('INVALID_DATA')
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
      .then((res) => {
        expect(res.body.success).toBeTruthy()
        expect(res.body.data.name).toBe('any_name')
        expect(res.body.message).toBe('customer created successfully')
        expect(res.body.status).toBe('SUCCESS')
      })
  })
})
