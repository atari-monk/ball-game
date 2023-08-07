import EventEmitter from 'eventemitter3';
import { IEventEmitterLogicUnit } from "atari-monk-ball-game-api";
import { LogicManagerGeneric } from '../logic/LogicManagerGeneric';

export class EventEmitterLogicManager extends LogicManagerGeneric<IEventEmitterLogicUnit> {
  public initializeEmitter(emitter: EventEmitter) {
    this.logicUnits.forEach((unit) => {
      unit.initializeEmitter(emitter);
    });
  }
}
