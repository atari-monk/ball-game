import { AppFactory } from './AppFactory'
import { PlayersFactory } from './PlayersFactory'
import { BallFactory } from './BallFactory'
import {
  ClientFactory,
  ISocketConfig,
} from 'atari-monk-ball-game-client'
import { FieldFactory } from './FieldFactory'

export class BallGameSimpleFactory {
  constructor(private readonly config: Partial<ISocketConfig>) {
    const appFactory = new AppFactory()
    const playersFactory = new PlayersFactory()
    const emitter = playersFactory.emitter
    const ballFactory = new BallFactory(emitter)
    const fieldFactory = new FieldFactory()

    const gameObjsManager = appFactory.gameObjsManager
    gameObjsManager.addGameObject(fieldFactory.field)
    gameObjsManager.addGameObject(playersFactory.player1)
    gameObjsManager.addGameObject(playersFactory.player2)
    gameObjsManager.addGameObject(ballFactory.ball)

    new ClientFactory(
      config,
      emitter,
      playersFactory.player1,
      playersFactory.player2,
      ballFactory.ball
    )

    appFactory.start()
  }
}
