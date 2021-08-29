import { IFindAllCustomers, IResponseFindAllCustomers } from '../../domain/usecases/find-all-customers'
import { makeCustomer } from '../../domain/models/customer'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import { Status } from '../../domain/usecases'

export class FindAllCustomers implements IFindAllCustomers {
  async findAll (): Promise<IResponseFindAllCustomers> {
    const result = await CustomerMongoose.find({})
    const data = result.map(customer => makeCustomer(customer))
    return {
      success: true,
      data,
      message: 'customers found successfully',
      status: Status.SUCCESS
    }
  }
}
