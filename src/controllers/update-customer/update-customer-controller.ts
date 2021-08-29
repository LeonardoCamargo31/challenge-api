
import { Router } from 'express'
import { IController } from '../IController'
import { IRequest, IResponse } from '../IHttp'
import { UpdateCustomer } from '../../usecases/update-customer/update-customer'
import { Status } from '../../domain/usecases'

export class UpdateCustomerController implements IController {
  public router = Router()
  private readonly updateCustomer: UpdateCustomer

  constructor (updateCustomer: UpdateCustomer) {
    this.updateCustomer = updateCustomer
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.put('/customer/:idCustomer', this.handle.bind(this))
  }

  async handle (request: IRequest, response: IResponse): Promise<IResponse> {
    const idCustomer = request.params.idCustomer
    const data = request.body
    const result = await this.updateCustomer.update(idCustomer,data)

    if (result.status === Status.INVALID_DATA) {
      return response.status(400).json(result)
    } else if (result.status === Status.NOT_FOUND) {
      return response.status(404).json(result)
    }

    return response.status(201).json(result)
  }
}
