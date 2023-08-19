import { Socket } from 'socket.io'
import { IVectorData } from 'atari-monk-ball-game-api'
import { SrvSctLogicUnit } from './lib/srv-sct-logic/SrvSctLogicUnit'

interface IClientPositions {
  [clientId: string]: IVectorData
}

export class BallMovement extends SrvSctLogicUnit {
  private clientPositions: IClientPositions = {}

  protected logicUnit(socket: Socket, data: IVectorData): void {
    if (data.clientId && data.clientId in this.clientPositions) {
      this.clientPositions[data.clientId] = data
    }

    if (Object.keys(this.clientPositions).length === 2) {
      const clientIds = Object.keys(this.clientPositions)
      const position1 = this.clientPositions[clientIds[0]].newVector
      const position2 = this.clientPositions[clientIds[1]].newVector

      const distance1 = Math.abs(position1.x) + Math.abs(position1.y)
      const distance2 = Math.abs(position2.x) + Math.abs(position2.y)

      const farPosition = distance1 > distance2 ? position1 : position2

      const jsObj = {
        clientId: 'server',
        newVector: farPosition,
      }

      socket.broadcast.emit('ballMovement', jsObj)

      this.clientPositions = {}
    }
  }
}
