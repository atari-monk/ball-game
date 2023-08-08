import { Environment } from './Environment'
import { SocketConfig } from './SocketConfig'
import { ISocketConfigurator } from './ISocketConfigurator'
import { injectable } from 'inversify'

@injectable()
export class SocketConfigurator implements ISocketConfigurator {
  private config: SocketConfig
  private _uri: string

  public get URI() {
    return this._uri
  }

  constructor(config?: Partial<SocketConfig>) {
    this.config = this.getConfig(config)
    this._uri = this.getUri()
  }

  private getConfig(config?: Partial<SocketConfig>): SocketConfig {
    return {
      environment: Environment.Production,
      localUri: 'http://localhost:3001',
      prodUri: 'https://atari-monk-ball-game-server.azurewebsites.net',
      ...config,
    }
  }

  private getUri() {
    return this.config.environment === Environment.Development
      ? this.config.localUri
      : this.config.prodUri
  }
}
