import { FindAllCustomersController } from './find-all-customers-controller'
import { FindAllCustomers } from '../../usecases/find-all-customers/find-all-customers'

export const makeFindAllCustomersController = (): FindAllCustomersController => {
  const findAllCustomers = new FindAllCustomers()
  const findAllCustomersController = new FindAllCustomersController(findAllCustomers)
  return findAllCustomersController
}
