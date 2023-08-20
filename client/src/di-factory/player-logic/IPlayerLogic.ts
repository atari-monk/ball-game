import { IPlayerManager } from 'atari-monk-ball-game-client-api'
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager'
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager'

export interface IPlayerLogic {
  manager: IPlayerManager;
  logic: SocketLogicManager;
  emitter: EventEmitterLogicManager;
}
