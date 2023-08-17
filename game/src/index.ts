import 'reflect-metadata'
import * as configUtils from './config/configUtils'
import { BallGameSimpleFactory } from './simple-factory/BallGameSimpleFactory'
import { BallGameDIFactory } from './di-factory/BallGameDIFactory'
import { FactoryVersion } from './config/IAppConfig'
import { IMobileDetectionService } from 'atari-monk-ball-game-api'

//const isMobile: IMobileDetectionService = new MobileDetectionService(); 

async function initializeConfig(): Promise<void> {
  const config = await configUtils.fetchConfig()
  const environment = config.environment
  const factory = config.factoryVersion
  if (factory === FactoryVersion.SimpleFactory) {
    new BallGameSimpleFactory({
      environment,
    })
  } else if (factory === FactoryVersion.DIFactory) {
    new BallGameDIFactory()
  } else {
    console.error('Invalid factory version specified in the config.')
  }
}

initializeConfig()
