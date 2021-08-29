import { ICustomer } from '../models/customer'
import { Status } from './index'

export interface IResponseCreateCustomer {
  success: boolean
  data?: ICustomer
  validationErrors?: {
    errorDetail: any
    errorFields: any
  }
  message: string
  status: Status
}

export interface ICreateCustomer {
  create: (customer: ICustomer) => Promise<IResponseCreateCustomer>
}
