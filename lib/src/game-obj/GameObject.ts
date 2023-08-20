import { injectable } from 'inversify';
import * as PIXI from 'pixi.js';
import { IGameObject } from "atari-monk-ball-game-lib-api";

@injectable()
export abstract class GameObject implements IGameObject {
  abstract draw(stage: PIXI.Container<PIXI.DisplayObject>): void;
  abstract update(deltaTime: number): void;
}
