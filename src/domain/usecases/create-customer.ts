import { ICustomer } from '../models/customer'

export interface IResponseCreateCustomer {
  success: boolean
  validationErrors?: {
    errorDetail: any
    errorFields: any
  }
  error?: any
}

export interface ICreateCustomer {
  create: (customer: ICustomer) => Promise<IResponseCreateCustomer>
}
