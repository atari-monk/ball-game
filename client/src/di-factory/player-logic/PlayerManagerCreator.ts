import { inject, injectable } from 'inversify'
import {
  ICreate,
  IPlayer,
  IPlayerNpc,
  PlayerNpcTypes,
  PlayerTypes,
} from 'atari-monk-ball-game-lib-api'
import { IPlayerManager } from 'atari-monk-ball-game-client-api'
import { PlayerManager } from '../../PlayerManager'

@injectable()
export class PlayerManagerCreator implements ICreate<IPlayerManager> {
  constructor(
    @inject(PlayerTypes.Player)
    private readonly player: IPlayer,
    @inject(PlayerNpcTypes.Player)
    private readonly playerNpc: IPlayerNpc,
    @inject(PlayerManager)
    private readonly playerManager: IPlayerManager
  ) {}

  public create(): IPlayerManager {
    this.playerManager.addPlayer('0', this.player)
    this.playerManager.addPlayerNpc('0', this.playerNpc)
    return this.playerManager
  }
}
