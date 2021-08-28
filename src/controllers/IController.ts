import { IRequest, IResponse } from './IHttp'

export interface IController {
  setupRoutes: () => void
  handle: (httpRequest: IRequest, httpResponse: IResponse) => Promise<IResponse>
}
