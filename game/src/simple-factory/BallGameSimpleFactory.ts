import { AppFactory } from './AppFactory'
import { PlayersFactory } from './PlayersFactory'
import { BallFactory } from './BallFactory'
import { ClientFactory, ISocketConfig } from 'atari-monk-ball-game-client'
import { FieldFactory } from './FieldFactory'
import { IFieldParams, IMobileFlags } from 'atari-monk-ball-game-lib-api'

export class BallGameSimpleFactory {
  constructor(
    clientConfig: Partial<ISocketConfig>,
    fieldConfig: IFieldParams,
    mobileState: IMobileFlags
  ) {
    const appFactory = new AppFactory(mobileState)
    const playersFactory = new PlayersFactory()
    const emitter = playersFactory.emitter
    const ballFactory = new BallFactory(emitter)
    const fieldFactory = new FieldFactory(fieldConfig)

    const gameObjsManager = appFactory.gameObjsManager
    gameObjsManager.addGameObject(fieldFactory.field)
    gameObjsManager.addGameObject(playersFactory.player1)
    gameObjsManager.addGameObject(playersFactory.player2)
    gameObjsManager.addGameObject(ballFactory.ball)

    new ClientFactory(
      clientConfig,
      emitter,
      playersFactory.player1,
      playersFactory.player2,
      ballFactory.ball
    )

    appFactory.start()
  }
}
