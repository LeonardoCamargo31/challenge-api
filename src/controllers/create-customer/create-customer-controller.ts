
import { IController } from '../IController'
import { IRequest, IResponse } from '../IHttp'

export class CreateCustomerController implements IController {
  async handle (httpRequest: IRequest): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      return resolve({})
    })
  }
}
