import { CreateCustomerController } from './create-customer-controller'
import { CreateCustomer } from '../../usecases/create-customer/create-customer'

export const makeCreateCustomerController = (): CreateCustomerController => {
  const createCustomer = new CreateCustomer()
  const createCustomerController = new CreateCustomerController(createCustomer)
  return createCustomerController
}
