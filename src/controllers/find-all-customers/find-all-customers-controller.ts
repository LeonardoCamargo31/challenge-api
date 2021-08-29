
import { Router } from 'express'
import { IController } from '../IController'
import { IRequest, IResponse } from '../IHttp'
import { FindAllCustomers } from '../../usecases/find-all-customers/find-all-customers'

export class FindAllCustomersController implements IController {
  public router = Router()
  private readonly findAllCustomers: FindAllCustomers

  constructor (findAllCustomers: FindAllCustomers) {
    this.findAllCustomers = findAllCustomers
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/customer', this.handle.bind(this))
  }

  async handle (request: IRequest, response: IResponse): Promise<IResponse> {
    const result = await this.findAllCustomers.findAll()
    return response.status(200).json(result)
  }
}
