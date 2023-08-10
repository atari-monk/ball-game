import 'reflect-metadata'
import { GameServer } from './GameServer'
import { ICreate, IDIFactory } from 'atari-monk-ball-game-api'
import { ServerSimpleFactory } from './simple-factory/ServerSimpleFactory'
import { ServerDIFactory } from './di-factory/ServerDIFactory'

const factory: ICreate<GameServer> = new ServerSimpleFactory()
const gameServer: GameServer = factory.create()
console.log('Starting...')
gameServer.start()

// const factory: IDIFactory<GameServer> = new ServerDIFactory();
// const gameServer: GameServer = factory.create();
// gameServer.start();
//
