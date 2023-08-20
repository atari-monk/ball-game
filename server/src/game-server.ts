import 'reflect-metadata'
import { GameServer } from './GameServer'
import { ICreate, IDIFactory } from 'atari-monk-ball-game-lib-api'
import { ServerSimpleFactory } from './simple-factory/ServerSimpleFactory'
import { ServerDIFactory } from './di-factory/ServerDIFactory'

console.log('create server factory:');
const factory: ICreate<GameServer> = new ServerSimpleFactory()
console.log('run factory:')
const gameServer: GameServer = factory.create()
console.log('starting game server')
gameServer.start()

// const factory: IDIFactory<GameServer> = new ServerDIFactory();
// const gameServer: GameServer = factory.create();
// gameServer.start();
//
