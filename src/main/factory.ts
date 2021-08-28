import { makeCreateCustomerController } from '../controllers/create-customer/create-customer-factory'
import { App } from './app'

export const makeApp = (): App => {
  const createCustomerController = makeCreateCustomerController()

  const app = new App([createCustomerController])
  return app
}
