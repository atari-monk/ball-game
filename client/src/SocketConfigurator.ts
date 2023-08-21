import {
  Environment,
  ISocketConfig,
  ISocketConfigurator,
} from 'atari-monk-ball-game-client-api'
import { injectable } from 'inversify'

@injectable()
export class SocketConfigurator implements ISocketConfigurator {
  private config: ISocketConfig
  private _uri: string

  public get URI() {
    return this._uri
  }

  constructor(config: Partial<ISocketConfig>) {
    this.config = this.getServerConfig(config)
    this._uri = this.getUri()
    console.log('client uri set to:', this._uri)
  }

  private getServerConfig(config: Partial<ISocketConfig>): ISocketConfig {
    return {
      environment: Environment.Development,
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
