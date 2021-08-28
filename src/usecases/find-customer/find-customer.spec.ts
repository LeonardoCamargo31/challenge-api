import { FindCustomer } from './find-customer'
import { ICustomer } from '../../domain/models/customer'
import { MongoHelper } from '../../infra/db/mongo-helper'
import { CreateCustomer } from '../create-customer/create-customer'

const makeSut = (): FindCustomer => {
  return new FindCustomer()
}

let customerData

describe('FindCustomer', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)

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

  test('Should return false, if customer id is invalid', async () => {
    const sut = makeSut()

    const result = await sut.find('any')
    expect(result.success).toBeFalsy()
  })

  test('Should return true, if create a new customer', async () => {
    const sut = makeSut()

    const result = await sut.find(customerData.data.id)
    expect(result.success).toBeTruthy()
    expect(result.data.name).toEqual(customerData.data.name)
  })
})
