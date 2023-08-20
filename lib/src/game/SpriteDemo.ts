import { IGameLoop, IGameObjectManager } from 'atari-monk-ball-game-lib-api'
import { inject, injectable } from 'inversify'
import { GameObjectManager } from '../game-obj/GameObjectManager'
import { PixiApplicationWrapper } from '../app/PixiApplicationWrapper'

@injectable()
export class SpriteDemo implements IGameLoop {
  constructor(
    @inject(PixiApplicationWrapper)
    private readonly pixiApp: PixiApplicationWrapper,
    @inject(GameObjectManager)
    private readonly gameObjectManager: IGameObjectManager
  ) {
    this.pixiApp = pixiApp
    this.gameObjectManager = gameObjectManager
  }

  public gameLoop(deltaTime: number) {
    this.pixiApp.stage.removeChildren()
    this.updateAndDrawGameObjects(deltaTime)
  }

  private updateAndDrawGameObjects(deltaTime: number) {
    for (const gameObject of this.gameObjectManager.gameObjects) {
      gameObject.update(deltaTime)
      gameObject.draw(this.pixiApp.stage)
    }
  }
}
