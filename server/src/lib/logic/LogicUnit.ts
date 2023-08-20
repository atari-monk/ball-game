import { ILogicUnit } from "atari-monk-ball-game-lib-api";

export abstract class LogicUnit implements ILogicUnit {
  public abstract logicUnit(...args: any[]): void;
}
