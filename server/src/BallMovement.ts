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

      if (
        this.clientPositions[clientIds[0]] &&
        this.clientPositions[clientIds[1]]
      ) {
        const position1 = this.clientPositions[clientIds[0]].newVector
        const position2 = this.clientPositions[clientIds[1]].newVector

        const distance1 = Math.sqrt(
          Math.pow(position1.x, 2) + Math.pow(position1.y, 2)
        )
        const distance2 = Math.sqrt(
          Math.pow(position2.x, 2) + Math.pow(position2.y, 2)
        )

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
}
