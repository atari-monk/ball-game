import { ILogicUnit } from 'atari-monk-ball-game-lib-api'

export abstract class LogicUnit implements ILogicUnit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract logicUnit(...args: any[]): void;
}
