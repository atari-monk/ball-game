import { inject, injectable } from 'inversify';
import {
    IDirectionFromKeyboard,
    IPlayerUpdater,
    PlayerTypes,
    IPlayer,
} from "atari-monk-ball-game-lib-api";
import { Vector2d } from '../model/Vector2d';

@injectable()
export class PlayerKeyboardMovement implements IPlayerUpdater {
  constructor(
    @inject(PlayerTypes.DirectionFromKeyboard)
    private readonly keyboard: IDirectionFromKeyboard
  ) {}

  public update(deltaTime: number, player: IPlayer) {
    const p = player.model;
    p.direction = this.keyboard.direction;
    p.position = new Vector2d(
      p.position.x + p.direction.x * p.speed * deltaTime,
      p.position.y + p.direction.y * p.speed * deltaTime
    );
  }
}
