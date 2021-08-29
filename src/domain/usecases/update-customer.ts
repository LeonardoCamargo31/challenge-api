import { ICustomer } from '../models/customer'
import { Status } from './index'

export interface IResponseUpdateCustomer {
  success: boolean
  data?: ICustomer
  validationErrors?: {
    errorDetail: any
    errorFields: any
  }
  message: string
  status: Status
}

export interface IUpdateCustomer {
  update: (customerId: string, customer: ICustomer) => Promise<IResponseUpdateCustomer>
}
