import 'reflect-metadata'
import * as configUtils from './config/configUtils'
import { BallGameSimpleFactory } from './simple-factory/BallGameSimpleFactory'
import { BallGameDIFactory } from './di-factory/BallGameDIFactory'
import { FactoryVersion } from './config/IAppConfig'
import { MobileDetectionService } from 'atari-monk-ball-game-lib'

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
  if (!mobileService.isMobileDevice()) {
    diodeElement?.classList.remove('on')
    diodeElement?.classList.remove('landscape')
    diodeElement?.classList.remove('portrait')
    console.log('not mobile')
    return
  }
  diodeElement?.classList.add('on')
  console.log('mobile')
  if (mobileService.isPortrait()) {
    diodeElement?.classList.add('portrait')
    diodeElement?.classList.remove('landscape')
    console.log('portrait')
  } else if (mobileService.isLandscape()) {
    diodeElement?.classList.add('landscape')
    diodeElement?.classList.remove('portrait')
    console.log('landscape')
  }
}

function handleOrientationChangeWithDebounce() {
  debounce(() => {
    handleOrientationChange()
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
