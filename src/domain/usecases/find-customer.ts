import { ICustomer } from '../models/customer'

export interface IResponseCreateCustomer {
  success: boolean
  data?: ICustomer
  validationErrors?: {
    errorDetail: any
    errorFields: any
  }
}

export interface IFindCustomer {
  find: (customerId: string) => Promise<IResponseCreateCustomer>
}
