import { ICreateCustomer, IResponseCreateCustomer } from '../../domain/usecases/create-customer'
import { ICustomer } from '../../domain/models/customer'
import { CustomerValidationSchema } from '../../validation/customer-validation-schema'
import { extractErrors } from '../../utils/extract-errors'
import { CustomerMongoose } from '../../infra/db/schemas/customer-mongoose'
import Joi from '@hapi/joi'

export class CreateCustomer implements ICreateCustomer {
  async create (customer: ICustomer): Promise<IResponseCreateCustomer> {
    const joiValidate = Joi.validate(customer, CustomerValidationSchema, {
      abortEarly: false,
      stripUnknown: true
    })

    if (joiValidate.error) {
      const validationErrors = extractErrors(joiValidate.error)
      return { success: false, validationErrors }
    }

    await CustomerMongoose.create(customer)
    return { success: true }
  }
}
