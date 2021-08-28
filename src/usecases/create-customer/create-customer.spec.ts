import { CreateCustomer } from './create-customer'
import { ICustomer } from '../../domain/models/customer'
import { MongoHelper } from '../../infra/db/mongo-helper'

const makeSut = (): CreateCustomer => {
  return new CreateCustomer()
}

describe('CreateCustomer', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return true if create a new customer', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg'
    }

    const result = await sut.create(customer)
    expect(result.success).toBeTruthy()
  })

  test('Should return false, if it has an invalid field', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: '',
      RG: 'any_rg'
    }

    const result = await sut.create(customer)
    expect(result.success).toBeFalsy()
    expect(result.validationErrors.errorDetail).toEqual({ CPF: ['any.empty', 'string.min'] })
    expect(result.validationErrors.errorFields).toEqual(['CPF'])
  })
})
