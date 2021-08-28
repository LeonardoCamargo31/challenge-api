import { ICustomer } from '../models/customer'

export interface IResponseFindCustomer {
  success: boolean
  data?: ICustomer
}

export interface IFindCustomer {
  find: (customerId: string) => Promise<IResponseFindCustomer>
}
