import { Socket } from 'socket.io-client'
import { ISocketLogicUnit } from 'atari-monk-ball-game-client-api'
import { injectable } from 'inversify'

@injectable()
export abstract class SocketLogicUnit implements ISocketLogicUnit {
  constructor(private readonly _eventName: string) {}

  public initializeSocket(socket: Socket) {
    socket.on(this._eventName, this.logicUnit.bind(this))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract logicUnit(...args: any[]): void;
}
