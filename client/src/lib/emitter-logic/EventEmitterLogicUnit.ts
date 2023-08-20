import EventEmitter from 'eventemitter3'
import { IEventEmitterLogicUnit } from 'atari-monk-ball-game-lib-api'

export abstract class EventEmitterLogicUnit implements IEventEmitterLogicUnit {
  constructor(private readonly _eventName: string) {}

  public initializeEmitter(emitter: EventEmitter): void {
    emitter.on(this._eventName, this.logicUnit.bind(this))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract logicUnit(...args: any[]): void;
}
