
import { Router } from 'express'
import { IController } from '../IController'
import { IRequest, IResponse } from '../IHttp'
import { FindCustomer } from '../../usecases/find-customer/find-customer'
import { Status } from '../../domain/usecases'

export class FindCustomerController implements IController {
  public router = Router()
  private readonly findCustomer: FindCustomer

  constructor (findCustomer: FindCustomer) {
    this.findCustomer = findCustomer
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/customer/:idCustomer', this.handle.bind(this))
  }

  async handle (request: IRequest, response: IResponse): Promise<IResponse> {
    const idCustomer = request.params.idCustomer
    const result = await this.findCustomer.find(idCustomer)

    console.log(result)
    if (result.status === Status.INVALID_DATA) {
      return response.status(400).json(result)
    } else if (result.status === Status.NOT_FOUND) {
      return response.status(404).json(result)
    }
    return response.status(200).json(result)
  }
}
