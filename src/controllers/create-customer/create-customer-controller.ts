
import { Router } from 'express'
import { IController } from '../IController'
import { IRequest, IResponse } from '../IHttp'
import { CreateCustomer } from '../../usecases/create-customer/create-customer'

export class CreateCustomerController implements IController {
  public router = Router()
  private readonly createCustomer: CreateCustomer

  constructor (createCustomer: CreateCustomer) {
    this.createCustomer = createCustomer
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.post('/customer', this.handle.bind(this))
  }

  async handle (request: IRequest, response: IResponse): Promise<IResponse> {
    const data = request.body
    const result = await this.createCustomer.create(data)
    if (!result.success) {
      return response.status(400).json(result)
    }
    return response.status(201).json(result)
  }
}
