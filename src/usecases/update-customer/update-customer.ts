import { IUpdateCustomer, IResponseUpdateCustomer } from '../../domain/usecases/update-customer'
import { ICustomer, makeCustomer } from '../../domain/models/customer'
import { CustomerValidationSchema } from '../../validation/customer-validation-schema'
import { extractErrors } from '../../utils/extract-errors'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import Joi from '@hapi/joi'
import { Types } from 'mongoose'
import { Status } from '../../domain/usecases'

export class UpdateCustomer implements IUpdateCustomer {
  async update (customerId: string, customer: ICustomer): Promise<IResponseUpdateCustomer> {
    if (!Types.ObjectId.isValid(customerId)) {
      return {
        success: false ,
        message: 'invalid customer id',
        status: Status.INVALID_DATA
      }
    }

    const joiValidate = Joi.validate(customer, CustomerValidationSchema, {
      abortEarly: false,
      stripUnknown: true
    })

    if (joiValidate.error) {
      const validationErrors = extractErrors(joiValidate.error)
      return {
        success: false,
        validationErrors,
        message: 'invalid data',
        status: Status.INVALID_DATA
      }
    }

    const filter = { _id: customerId }
    const result = await CustomerMongoose.findOneAndUpdate(filter,customer,{ new: true })
    if (!result) {
      return {
        success: false ,
        message: 'customer not found',
        status: Status.NOT_FOUND
      }
    }

    const data = makeCustomer(result)
    return {
      success: true,
      data,
      message: 'customer updated successfully',
      status: Status.SUCCESS
    }
  }
}
