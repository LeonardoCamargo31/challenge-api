import { MongoHelper } from '../../infra/db/mongo-helper'
import { makeApp } from '../../main/factory'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import request from 'supertest'
const app = makeApp().express

describe('FindAllCustomersController', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    await CustomerMongoose.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const session: request.SuperAgentTest = request.agent(app)
  test('Should return all customers', async () => {
    await session
      .post('/customer')
      .send({
        name: 'any_name',
        birthDate: new Date(),
        CPF: 'any_cpf',
        RG: 'any_rg'
      })
      .expect(201)
      .then(async () => {
        await session
          .get('/customer')
          .expect(200)
          .then((res) => {
            expect(res.body.success).toBeTruthy()
            expect(res.body.data).toHaveLength(1)
          })
      })
  })

  test('Should return all customers', async () => {
    await session
      .get('/customer')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBeTruthy()
        expect(res.body.data).toHaveLength(0)
      })
  })
})
