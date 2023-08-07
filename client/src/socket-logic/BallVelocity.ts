import { IVectorData } from "atari-monk-ball-game-api";
import { BallManager } from '../BallManager';
import { SocketLogicUnit } from '../lib/socket-logic/SocketLogicUnit';
import { Vector2d } from '../lib/Vector2d';

export class BallVelocity extends SocketLogicUnit {
  constructor(eventName: string, private readonly ballManager: BallManager) {
    super(eventName);
  }

  protected logicUnit(jsObj: any) {
    try {
      const newData: IVectorData = {
        clientId: jsObj.clientId,
        newVector: new Vector2d(jsObj.newVector.x, jsObj.newVector.y),
      };
      this.ballManager.updateBallVelocity(newData.newVector);
    } catch (error) {
      console.log(error);
    }
  }
}
