import { IBallManager } from 'atari-monk-ball-game-client-api'
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager'
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager'

export interface IBallLogic {
  manager: IBallManager
  logic: SocketLogicManager
  emitter: EventEmitterLogicManager
}
