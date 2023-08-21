import { BallTypes, IBall, IVector2d } from 'atari-monk-ball-game-lib-api'
import { inject, injectable } from 'inversify'
import { IBallManager } from 'atari-monk-ball-game-client-api'

@injectable()
export class BallManager implements IBallManager {
  constructor(
    @inject(BallTypes.Ball)
    private readonly ball: IBall
  ) {}

  public setClient(clientId: string) {
    return (this.ball.model.clientId = clientId)
  }

  public updateBallPosition(newPosition: IVector2d) {
    this.ball.model.position = newPosition
  }

  public updateBallVelocity(newVelocity: IVector2d) {
    this.ball.model.velocity = newVelocity
  }
}
