import { UpdateCustomer } from './update-customer'
import { ICustomer } from '../../domain/models/customer'
import { MongoHelper } from '../../infra/db/mongo-helper'
import { CreateCustomer } from '../create-customer/create-customer'

const makeSut = (): UpdateCustomer => {
  return new UpdateCustomer()
}

let customerData

describe('UpdateCustomer', () => {
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

  test('Should return true and update customer name', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'update_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg'
    }

    const result = await sut.update(customerData.data.id, customer)
    expect(result.success).toBeTruthy()
    expect(result.data.id).toEqual(customerData.data.id)
    expect(result.data.name).toBe(customer.name)
  })

  test('Should return false, if customer id is invalid', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'update_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg'
    }

    const result = await sut.update('any', customer)
    expect(result.success).toBeFalsy()
  })

  test('Should return false, if it has an invalid field', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'update_name',
      birthDate: new Date(),
      CPF: '',
      RG: 'any_rg'
    }

    const result = await sut.update(customerData.data.id, customer)
    expect(result.success).toBeFalsy()
    expect(result.validationErrors.errorDetail).toEqual({ CPF: ['any.empty', 'string.min'] })
    expect(result.validationErrors.errorFields).toEqual(['CPF'])
  })

  test('Should return false, if do not find a customer', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'update_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg'
    }
    const anyId = '507f1f77bcf86cd799439011'
    const result = await sut.update(anyId, customer)
    expect(result.success).toBeFalsy()
  })
})
