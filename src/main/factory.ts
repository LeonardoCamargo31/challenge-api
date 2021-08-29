import { makeCreateCustomerController } from '../controllers/create-customer/create-customer-factory'
import { makeFindCustomerController } from '../controllers/find-customer/find-customer-factory'
import { makeUpdateCustomerController } from '../controllers/update-customer/update-customer-factory'
import { App } from './app'

export const makeApp = (): App => {
  const createCustomerController = makeCreateCustomerController()
  const findCustomerController = makeFindCustomerController()
  const updateCustomerController = makeUpdateCustomerController()
  const app = new App([createCustomerController, findCustomerController, updateCustomerController])
  return app
}
