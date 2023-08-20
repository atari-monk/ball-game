import { Socket } from 'socket.io'
import { IVectorData } from 'atari-monk-ball-game-lib-api'
import { SrvSctLogicUnit } from './lib/srv-sct-logic/SrvSctLogicUnit'

export class BallMovement extends SrvSctLogicUnit {
  private clientPositions: IVectorData[] = []
  private readonly socketEventName = 'ballMovement'

  protected logicUnit(socket: Socket, data: IVectorData): void {
    if (this.isDataBroken(data)) return
    if (this.isFirstClient()) {
      this.addClient(data)
    } else if (this.isSecondClient(data)) {
      this.addClient(data)
      this.broadcastToClients(socket)
      this.clearClients()
    }
  }

  private isDataBroken(data: IVectorData) {
    return !data.clientId
  }

  private isFirstClient() {
    return this.clientPositions.length === 0
  }

  private addClient(data: IVectorData) {
    this.clientPositions.push(data)
  }

  private isSecondClient(data: IVectorData) {
    return (
      this.clientPositions.length === 1 &&
      this.clientPositions[0].clientId !== data.clientId
    )
  }

  private broadcastToClients(socket: Socket) {
    const data = this.createBallMovementObject()
    socket.emit(this.socketEventName, data)
    socket.broadcast.emit(this.socketEventName, data)
  }

  private createBallMovementObject() {
    return {
      clientId: 'server',
      newVector: this.calculateMiddlePosition(),
    }
  }

  private calculateMiddlePosition() {
    const position1 = this.clientPositions[0].newVector
    const position2 = this.clientPositions[1].newVector

    const middlePosition = {
      x: (position1.x + position2.x) / 2,
      y: (position1.y + position2.y) / 2,
    }
    return middlePosition
  }

  private clearClients() {
    this.clientPositions = []
  }
}
