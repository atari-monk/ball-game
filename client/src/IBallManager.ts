import { IVector2d } from 'atari-monk-ball-game-lib-api'

export interface IBallManager {
  setClient(clientId: string): void
  updateBallPosition(newPosition: IVector2d): void
  updateBallVelocity(newVelocity: IVector2d): void
}
