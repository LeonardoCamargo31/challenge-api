import express from 'express'
import bodyParser from 'body-parser'

export class App {
  public app: express.Application
  public port: Number

  constructor (controllers) {
    this.app = express()
    this.port = parseInt(process.env.PORT, 10)

    this.setupExpress()
    this.setupMiddlewares()
    this.setupControllers(controllers)
  }

  private setupExpress (): void {
    this.app.set('port', process.env.PORT)
  }

  private setupMiddlewares (): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  private setupControllers (controllers): void {
    controllers.forEach(controller => {
      this.app.use(controller.router)
    })
  }
}
