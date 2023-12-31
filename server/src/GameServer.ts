import { Express } from 'express'
import cors from 'cors'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { Types } from './di-factory/types'

@injectable()
export class GameServer {
  private readonly PORT: string | number

  constructor(
    @inject(Types.Server) private readonly app: Express,
    @inject(Types.ServerHttp) private readonly server: Server
  ) {
    this.PORT = process.env.PORT || 3001
  }

  public start() {
    this.configureMiddleware()
    this.listen()
  }

  private configureMiddleware() {
    this.app.use(
      cors({
        origin: 'https://kind-moss-0f787ca03.3.azurestaticapps.net',
      })
    )
  }

  private listen() {
    try {
      this.server.listen(this.PORT, () => {
        console.log(`Server is running on port ${this.PORT}`)
      })
    } catch (error) {
      console.error('Error while starting the server:', error)
    }
  }
}
