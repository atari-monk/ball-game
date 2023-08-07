import { ILogicUnit } from "atari-monk-ball-game-api";

export abstract class LogicUnit implements ILogicUnit {
  public abstract logicUnit(...args: any[]): void;
}
