import { ICustomer } from '../models/customer'

export interface IResponseUpdateCustomer {
  success: boolean
  data?: ICustomer
  validationErrors?: {
    errorDetail: any
    errorFields: any
  }
}

export interface IUpdateCustomer {
  update: (customerId: string, customer: ICustomer) => Promise<IResponseUpdateCustomer>
}
