import 'reflect-metadata'
import * as configUtils from './config/configUtils'
import { BallGameSimpleFactory } from './simple-factory/BallGameSimpleFactory'
import { BallGameDIFactory } from './di-factory/BallGameDIFactory'
import { FactoryVersion } from './config/IAppConfig'
import {
  MobileDetectionService,
  fieldParams,
  mobileState,
} from 'atari-monk-ball-game-lib'
import { IFieldParams } from 'atari-monk-ball-game-api'
import { mobilePortrait } from './data/mobilePortrait'

let fieldConfig: IFieldParams
const mobileService = new MobileDetectionService()
const diodeElement = document.getElementById('diode')

function debounce(callback: () => void, delay: number): void {
  let debounceTimer: NodeJS.Timeout | null = null

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(callback, delay)
}

function handleOrientationChange() {
  mobileState.setFlags(
    mobileService.isMobileDevice(),
    mobileService.isPortrait(),
    mobileService.isLandscape()
  )
  if (!mobileState.mobile) {
    diodeElement?.classList.remove('on')
    diodeElement?.classList.remove('landscape')
    diodeElement?.classList.remove('portrait')
    fieldConfig = fieldParams
    return
  }
  diodeElement?.classList.add('on')
  if (mobileState.portrait) {
    diodeElement?.classList.add('portrait')
    diodeElement?.classList.remove('landscape')
    fieldConfig = mobilePortrait.fieldParams
  } else if (mobileState.landscape) {
    diodeElement?.classList.add('landscape')
    diodeElement?.classList.remove('portrait')
  }
}

function handleOrientationChangeWithDebounce() {
  debounce(() => {
    handleOrientationChange()
    initializeConfig()
    console.log('Screen width: ' + window.innerWidth + ' pixels')
    console.log('Screen height: ' + window.innerHeight + ' pixels')
  }, 300)
}

handleOrientationChangeWithDebounce()
mobileService.addOrientationChangeListeners(handleOrientationChangeWithDebounce)
window.addEventListener('beforeunload', () => {
  mobileService.removeOrientationChangeListeners(handleOrientationChange)
})

async function initializeConfig(): Promise<void> {
  const config = await configUtils.fetchConfig()
  const environment = config.environment
  const factory = config.factoryVersion
  if (factory === FactoryVersion.SimpleFactory) {
    new BallGameSimpleFactory(
      {
        environment,
      },
      fieldConfig,
      mobileState
    )
  } else if (factory === FactoryVersion.DIFactory) {
    new BallGameDIFactory()
  } else {
    console.error('Invalid factory version specified in the config.')
  }
}
