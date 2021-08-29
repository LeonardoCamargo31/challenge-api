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

  test('Should return true, if create a new customer', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg'
    }

    const result = await sut.create(customer)
    expect(result.success).toBeTruthy()
    expect(result.data.id).toBeTruthy()
    expect(result.data.name).toEqual(customer.name)
    expect(result.data.birthDate).toEqual(customer.birthDate)
    expect(result.data.CPF).toEqual(customer.CPF)
    expect(result.data.RG).toEqual(customer.RG)
    expect(result.data.address).toHaveLength(0)
    expect(result.message).toBe('customer created successfully')
    expect(result.status).toBe('SUCCESS')
  })

  test('Should return true, if create a new customer with address', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg',
      address: [{
        city: 'any_city',
        state: 'SP',
        name: 'any_name',
        street: 'any_street',
        neighborhood: 'any_neighborhood',
        number: 268
      }]
    }

    const result = await sut.create(customer)
    const address = customer.address[0]
    expect(result.success).toBeTruthy()
    expect(result.data.address).toHaveLength(1)
    expect(result.data.address[0].city).toEqual(address.city)
    expect(result.data.address[0].state).toEqual(address.state)
    expect(result.data.address[0].name).toEqual(address.name)
    expect(result.data.address[0].street).toEqual(address.street)
    expect(result.data.address[0].neighborhood).toEqual(address.neighborhood)
    expect(result.data.address[0].number).toEqual(address.number)
    expect(result.message).toBe('customer created successfully')
    expect(result.status).toBe('SUCCESS')
  })

  test('Should return true, if create a new customer with phone', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg',
      phone: [{
        name: 'any_name',
        phone: 'any_phone'
      }]
    }

    const result = await sut.create(customer)
    const phone = customer.phone[0]
    expect(result.success).toBeTruthy()
    expect(result.data.phone).toHaveLength(1)
    expect(result.data.phone[0].name).toEqual(phone.name)
    expect(result.data.phone[0].phone).toEqual(phone.phone)
    expect(result.message).toBe('customer created successfully')
    expect(result.status).toBe('SUCCESS')
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
    expect(result.message).toBe('invalid data')
    expect(result.status).toBe('INVALID_DATA')
  })

  test('Should return true, if create a new customer with social networks', async () => {
    const sut = makeSut()

    const customer: ICustomer = {
      name: 'any_name',
      birthDate: new Date(),
      CPF: 'any_cpf',
      RG: 'any_rg',
      facebook: 'any_facebook',
      twitter: 'any_twitter',
      linkedin: 'any_linkedin',
      instagram: 'any_instagram'
    }

    const result = await sut.create(customer)
    expect(result.success).toBeTruthy()
    expect(result.data.facebook).toEqual(customer.facebook)
    expect(result.data.twitter).toEqual(customer.twitter)
    expect(result.data.linkedin).toEqual(customer.linkedin)
    expect(result.data.instagram).toEqual(customer.instagram)
    expect(result.message).toBe('customer created successfully')
    expect(result.status).toBe('SUCCESS')
  })
})
