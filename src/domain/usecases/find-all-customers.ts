import { ICustomer } from '../models/customer'
import { Status } from './index'

export interface IResponseFindAllCustomers {
  success: boolean
  data?: ICustomer[]
  message: string
  status: Status
}

export interface IFindAllCustomers {
  findAll: () => Promise<IResponseFindAllCustomers>
}
