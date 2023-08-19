import { IVectorData } from 'atari-monk-ball-game-api'
import { BallManager } from '../BallManager'
import { SocketLogicUnit } from '../lib/socket-logic/SocketLogicUnit'
import { Vector2d } from '../lib/Vector2d'

export class BallMovement extends SocketLogicUnit {
  constructor(eventName: string, private readonly ballManager: BallManager) {
    super(eventName)
  }

  protected logicUnit(jsObj: unknown) {
    try {
      const typedObj = jsObj as IVectorData
      const data: IVectorData = {
        clientId: typedObj.clientId,
        newVector: new Vector2d(typedObj.newVector.x, typedObj.newVector.y),
      }
      this.ballManager.updateBallPosition(data.newVector)
      console.log('ball pos updated:', data.newVector)
    } catch (error) {
      console.log(error)
    }
  }
}
