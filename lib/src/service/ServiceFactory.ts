import { Container } from 'inversify';
import {
    IBasicRenderer,
    IRegister,
    IGameObjectManager,
    SharedTypes,
} from "atari-monk-ball-game-lib-api";
import { BasicRenderer } from '../BasicRenderer';
import { GameObjectManager } from '../game-obj/GameObjectManager';
import EventEmitter from 'eventemitter3';

export class ServiceFactory implements IRegister {
  constructor(public readonly container: Container) {}

  public register() {
    this.container
      .bind<IBasicRenderer>(SharedTypes.BasicRenderer)
      .to(BasicRenderer)
      .inSingletonScope();

    this.container
      .bind<EventEmitter>(SharedTypes.EventEmitter)
      .toConstantValue(new EventEmitter());

    this.container
      .bind<IGameObjectManager>(SharedTypes.GameObjsManager)
      .to(GameObjectManager)
      .inSingletonScope();
  }
}
