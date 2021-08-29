import { makeCreateCustomerController } from '../controllers/create-customer/create-customer-factory'
import { makeFindCustomerController } from '../controllers/find-customer/find-customer-factory'

import { App } from './app'

export const makeApp = (): App => {
  const createCustomerController = makeCreateCustomerController()
  const findCustomerController = makeFindCustomerController()
  const app = new App([createCustomerController, findCustomerController])
  return app
}
