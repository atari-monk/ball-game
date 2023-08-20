import { IVectorData } from 'atari-monk-ball-game-lib-api'
import { SocketLogicUnit } from '../lib/socket-logic/SocketLogicUnit'
import { Vector2d } from '../lib/Vector2d'
import { IBallManager } from '../IBallManager'

export class BallVelocity extends SocketLogicUnit {
  constructor(eventName: string, private readonly ballManager: IBallManager) {
    super(eventName)
  }

  protected logicUnit(jsObj: unknown) {
    try {
      const typedObj: IVectorData = jsObj as IVectorData
      const newData: IVectorData = {
        clientId: typedObj.clientId,
        newVector: new Vector2d(typedObj.newVector.x, typedObj.newVector.y),
      }
      this.ballManager.updateBallVelocity(newData.newVector)
    } catch (error) {
      console.log(error)
    }
  }
}
