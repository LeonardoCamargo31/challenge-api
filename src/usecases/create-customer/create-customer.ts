import { ICreateCustomer, IResponseCreateCustomer } from '../../domain/usecases/create-customer'
import { ICustomer, makeCustomer } from '../../domain/models/customer'
import { CustomerValidationSchema } from '../../validation/customer-validation-schema'
import { extractErrors } from '../../utils/extract-errors'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import Joi from '@hapi/joi'
import { Status } from '../../domain/usecases'

export class CreateCustomer implements ICreateCustomer {
  async create (customer: ICustomer): Promise<IResponseCreateCustomer> {
    const joiValidate = Joi.validate(customer, CustomerValidationSchema, {
      abortEarly: false,
      stripUnknown: true
    })

    if (joiValidate.error) {
      const validationErrors = extractErrors(joiValidate.error)
      return {
        success: false,
        validationErrors ,
        message: 'invalid data',
        status: Status.INVALID_DATA
      }
    }

    const result = await CustomerMongoose.create(customer)
    const data = makeCustomer(result)

    return {
      success: true,
      data,
      message: 'customer created successfully',
      status: Status.SUCCESS
    }
  }
}
