import { ICustomer } from '../models/customer'

export interface IResponseFindAllCustomers {
  success: boolean
  data?: ICustomer[]
}

export interface IFindAllCustomers {
  findAll: () => Promise<IResponseFindAllCustomers>
}
