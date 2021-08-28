import { CreateCustomerController } from './create-customer-controller'

export const makeCreateCustomerController = (): CreateCustomerController => {
  const createCustomerController = new CreateCustomerController()
  return createCustomerController
}
