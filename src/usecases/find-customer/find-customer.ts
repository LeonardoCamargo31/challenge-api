import { IFindCustomer, IResponseCreateCustomer } from '../../domain/usecases/find-customer'
import { makeCustomer } from '../../domain/models/customer'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import { Types } from 'mongoose'

export class FindCustomer implements IFindCustomer {
  async find (customerId: string): Promise<IResponseCreateCustomer> {
    if (!Types.ObjectId.isValid(customerId)) {
      return { success: false }
    }

    const result = await CustomerMongoose.findById(customerId)
    const data = makeCustomer(result)

    return { success: true, data }
  }
}
