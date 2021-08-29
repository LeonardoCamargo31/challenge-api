import { ICustomer } from '../models/customer'
import { Status } from './index'

export interface IResponseFindCustomer {
  success: boolean
  data?: ICustomer
  message: string
  status: Status
}

export interface IFindCustomer {
  find: (customerId: string) => Promise<IResponseFindCustomer>
}
