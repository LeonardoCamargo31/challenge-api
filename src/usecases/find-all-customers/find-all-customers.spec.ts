import { FindAllCustomers } from './find-all-customers'
import { ICustomer } from '../../domain/models/customer'
import { MongoHelper } from '../../infra/db/mongo-helper'
import { CreateCustomer } from '../create-customer/create-customer'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'

const makeSut = (): FindAllCustomers => {
  return new FindAllCustomers()
}

let customerData

describe('FindCustomer', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)

    await CustomerMongoose.deleteMany({})

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg'
    }

    customerData = await new CreateCustomer().create(customer)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return true and data with array with a client', async () => {
    const sut = makeSut()
    const result = await sut.findAll()
    expect(result.success).toBeTruthy()
    expect(result.data).toHaveLength(1)
    expect(result.data[0].name).toBe(customerData.data.name)
  })
})
