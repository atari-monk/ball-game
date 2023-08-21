import { Container, injectable } from 'inversify'
import { Manager, Socket } from 'socket.io-client'
import { SocketConfigurator } from '../../SocketConfigurator'
import {
  ISocketConfigurator,
  Environment,
} from 'atari-monk-ball-game-client-api'
import { SocketErrorHandler } from '../../SocketErrorHandler'
import { IDIFactory } from 'atari-monk-ball-game-client-api'

@injectable()
export abstract class SocketFactory implements IDIFactory<Socket> {
  public register(container: Container) {
    container
      .bind<ISocketConfigurator>(SocketConfigurator)
      .toDynamicValue(() => {
        return new SocketConfigurator({ environment: Environment.Production })
      })
      .inSingletonScope()

    container
      .bind<Manager>(Manager)
      .toDynamicValue(() => {
        const configer =
          container.resolve<ISocketConfigurator>(SocketConfigurator)
        return new Manager(configer.URI)
      })
      .inSingletonScope()

    this.createSocket(container)

    container
      .bind<SocketErrorHandler>(SocketErrorHandler)
      .toSelf()
      .inSingletonScope()
  }

  protected abstract createSocket(container: Container): void

  public create(container: Container): Socket {
    const socket = container.resolve<Socket>(Socket)
    container.resolve<SocketErrorHandler>(SocketErrorHandler)
    return socket
  }
}
