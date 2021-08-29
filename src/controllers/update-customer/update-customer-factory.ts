import { UpdateCustomerController } from './update-customer-controller'
import { UpdateCustomer } from '../../usecases/update-customer/update-customer'

export const makeUpdateCustomerController = (): UpdateCustomerController => {
  const updateCustomer = new UpdateCustomer()
  const updateCustomerController = new UpdateCustomerController(updateCustomer)
  return updateCustomerController
}
