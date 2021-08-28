import express from 'express'
import bodyParser from 'body-parser'
import { PORT, NODE_ENV, MONGO_URL } from '../config/env-variables'

export class App {
  public _app: express.Application
  public _port: Number
  public _env: string
  public _mongoUrl: string

  get express (): express.Application {
    return this._app
  }

  get port (): Number {
    return this._port
  }

  get env (): string {
    return this._env
  }

  get mongoUrl (): string {
    return this._mongoUrl
  }

  constructor (controllers) {
    this._app = express()
    this._port = parseInt(PORT, 10)
    this._env = NODE_ENV
    this._mongoUrl = MONGO_URL

    this.setupExpress()
    this.setupMiddlewares()
    this.setupControllers(controllers)
  }

  private setupExpress (): void {
    this._app.set('port', this._port)
  }

  private setupMiddlewares (): void {
    this._app.use(bodyParser.json())
    this._app.use(bodyParser.urlencoded({ extended: true }))
  }

  private setupControllers (controllers): void {
    controllers.forEach(controller => {
      this._app.use(controller.router)
    })
  }
}
