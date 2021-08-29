import { FindCustomerController } from './find-customer-controller'
import { FindCustomer } from '../../usecases/find-customer/find-customer'

export const makeFindCustomerController = (): FindCustomerController => {
  const findCustomer = new FindCustomer()
  const findCustomerController = new FindCustomerController(findCustomer)
  return findCustomerController
}
