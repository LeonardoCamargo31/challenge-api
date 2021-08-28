import { IRequest, IResponse } from './IHttp'

export interface IController {
  handle: (httpRequest: IRequest) => Promise<IResponse>
}
