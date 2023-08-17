import { IGameLoop } from './IGameLoop'
import { IBall } from '../ball/IBall'
import { IPlayer } from '../player/IPlayer'

export interface IBallGame extends IGameLoop {
  ball: IBall
  player: IPlayer
  setBallGameObjects(): void
}
