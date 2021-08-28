
import { Router } from 'express'
import { IController } from '../IController'
import { IRequest, IResponse } from '../IHttp'

export class CreateCustomerController implements IController {
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.post('/customer', this.handle.bind(this))
  }

  async handle (request: IRequest, response: IResponse): Promise<IResponse> {
    return response.status(500).json({
      message: 'something is wrong!'
    })
  }
}
