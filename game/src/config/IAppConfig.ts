import { Environment } from 'atari-monk-ball-game-client-api'

export enum FactoryVersion {
  SimpleFactory = 'simpleFactory',
  DIFactory = 'diFactory',
}

export interface IAppConfig {
  environment: Environment
  factoryVersion: FactoryVersion
}
