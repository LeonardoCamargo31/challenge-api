import Joi from '@hapi/joi'
import { stateList } from './state-list'

export const PhoneValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  phone: Joi.string().min(1).max(20).required()
})

export const AddressValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  street: Joi.string().min(1).max(100).required(),
  number: Joi.string().min(1).max(100).required(),
  neighborhood: Joi.string().min(1).max(100).required(),
  city: Joi.string().min(1).max(100).required(),
  state: Joi.string().equal(stateList).required()
})

export const CustomerValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  birthDate: Joi.date().required(),
  CPF: Joi.string().min(1).max(11).required(),
  RG: Joi.string().min(1).max(8).required(),
  facebook: Joi.string().min(1).max(100),
  instagram: Joi.string().min(1).max(100),
  twitter: Joi.string().min(1).max(100),
  linkedin: Joi.string().min(1).max(100),
  address: AddressValidationSchema,
  phone: PhoneValidationSchema
})
