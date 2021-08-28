import { IUpdateCustomer, IResponseUpdateCustomer } from '../../domain/usecases/update-customer'
import { ICustomer, makeCustomer } from '../../domain/models/customer'
import { CustomerValidationSchema } from '../../validation/customer-validation-schema'
import { extractErrors } from '../../utils/extract-errors'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import Joi from '@hapi/joi'
import { Types } from 'mongoose'

export class UpdateCustomer implements IUpdateCustomer {
  async update (customerId: string, customer: ICustomer): Promise<IResponseUpdateCustomer> {
    if (!Types.ObjectId.isValid(customerId)) {
      return { success: false }
    }

    const joiValidate = Joi.validate(customer, CustomerValidationSchema, {
      abortEarly: false,
      stripUnknown: true
    })

    if (joiValidate.error) {
      const validationErrors = extractErrors(joiValidate.error)
      return { success: false, validationErrors }
    }

    const filter = { _id: customerId }
    const result = await CustomerMongoose.findOneAndUpdate(filter,customer,{ new: true })
    if (!result) {
      return { success: false }
    }

    const data = makeCustomer(result)
    return { success: true, data }
  }
}
