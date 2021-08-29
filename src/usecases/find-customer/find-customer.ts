import { IFindCustomer, IResponseFindCustomer } from '../../domain/usecases/find-customer'
import { makeCustomer } from '../../domain/models/customer'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import { Types } from 'mongoose'
import { Status } from '../../domain/usecases'

export class FindCustomer implements IFindCustomer {
  async find (customerId: string): Promise<IResponseFindCustomer> {
    if (!Types.ObjectId.isValid(customerId)) {
      return { success: false, message: 'invalid customer id', status: Status.INVALID_DATA }
    }

    const result = await CustomerMongoose.findById(customerId)
    if (!result) {
      return { success: false, message: 'customer not found', status: Status.NOT_FOUND }
    }

    const data = makeCustomer(result)
    return { success: true, data, message: 'customer found successfully', status: Status.SUCCESS }
  }
}
