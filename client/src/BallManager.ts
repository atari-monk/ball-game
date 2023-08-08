import { BallTypes, IBall, IVector2d } from 'atari-monk-ball-game-api'
import { inject, injectable } from 'inversify'

@injectable()
export class BallManager {
  constructor(
    @inject(BallTypes.Ball)
    private readonly ball: IBall
  ) {}

  public updateBallPosition(newPosition: IVector2d) {
    this.ball.model.position = newPosition
  }

  public updateBallVelocity(newVelocity: IVector2d) {
    this.ball.model.velocity = newVelocity
  }
}
