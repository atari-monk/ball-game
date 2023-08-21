import { inject, injectable } from 'inversify'
import { ICreate } from 'atari-monk-ball-game-lib-api'
import { BallMovement } from '../../socket-logic/BallMovement'
import { BallVelocity } from '../../socket-logic/BallVelocity'
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager'
import { ISocketLogicUnit } from 'atari-monk-ball-game-client-api'

@injectable()
export class BallLogicCreator implements ICreate<SocketLogicManager> {
  constructor(
    @inject(BallMovement)
    private readonly ballMovement: ISocketLogicUnit,
    @inject(BallVelocity)
    private readonly ballVelocity: ISocketLogicUnit,
    @inject(SocketLogicManager)
    private readonly ballLogicManager: SocketLogicManager
  ) {}

  public create(): SocketLogicManager {
    this.ballLogicManager.addLogic(this.ballMovement)
    this.ballLogicManager.addLogic(this.ballVelocity)
    return this.ballLogicManager
  }
}
